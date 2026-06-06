import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

// Apify actor that does the real work (runs server-side, billed pay-per-event).
const ACTOR_ID = 'apivault_labs~tiktok-profile-scraper';

export class TikTokProfile implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'TikTok Profile',
		name: 'tikTokProfile',
		icon: 'file:tiktokprofile.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["usernames"]}}',
		description:
			'Scrape real-time TikTok profile data: followers, likes, videos, bio, verification, plus creator-tier and engagement-rate signals.',
		defaults: {
			name: 'TikTok Profile',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'apifyApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Usernames',
				name: 'usernames',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'khaby.lame, charlidamelio',
				description:
					'One or more TikTok usernames, separated by commas or new lines. The leading @ is optional.',
			},
			{
				displayName: 'Use Apify Proxy',
				name: 'useProxy',
				type: 'boolean',
				default: true,
				description: 'Whether to route requests through Apify proxy (recommended)',
			},
			{
				displayName: 'Proxy Group',
				name: 'proxyGroup',
				type: 'options',
				options: [
					{ name: 'Residential (recommended)', value: 'RESIDENTIAL' },
					{ name: 'Datacenter', value: 'DATACENTER' },
				],
				default: 'RESIDENTIAL',
				displayOptions: { show: { useProxy: [true] } },
				description: 'Residential IPs are far less likely to be blocked by TikTok',
			},
			{
				displayName: 'Max Retries',
				name: 'maxRetries',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 5 },
				default: 3,
				description: 'Per-username retry attempts with a fresh proxy IP',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const raw = this.getNodeParameter('usernames', i) as string;
				const useProxy = this.getNodeParameter('useProxy', i) as boolean;
				const proxyGroup = useProxy
					? (this.getNodeParameter('proxyGroup', i) as string)
					: 'RESIDENTIAL';
				const maxRetries = this.getNodeParameter('maxRetries', i) as number;

				const usernames = raw
					.split(/[,\n]/)
					.map((u) => u.replace(/^@/, '').trim())
					.filter((u) => u.length > 0);

				if (usernames.length === 0) {
					throw new NodeOperationError(
						this.getNode(),
						'No valid usernames provided',
						{ itemIndex: i },
					);
				}

				const body = {
					usernames,
					maxRetries,
					proxyGroup,
					useProxy,
				};

				const options: IRequestOptions = {
					method: 'POST' as IHttpRequestMethods,
					url: `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items`,
					body,
					json: true,
				};

				const response = await this.helpers.requestWithAuthentication.call(
					this,
					'apifyApi',
					options,
				);

				const results = Array.isArray(response) ? response : [response];
				for (const result of results) {
					returnData.push({ json: result, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
