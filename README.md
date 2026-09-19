# TikTok Profile for n8n

Collect current public TikTok profile information by username, including audience size, likes, video count, bio, verification and creator-level signals.

## Install

In n8n, open **Settings → Community Nodes → Install** and enter `n8n-nodes-apivault-tiktok-profile`. Add an **Apify API** credential, then select it in the node.

## Quickstart

Import [`examples/quickstart-workflow.json`](examples/quickstart-workflow.json), replace the sample usernames, select your credential, and run it. The final node creates a compact creator snapshot for a sheet, database or review queue.

## Useful workflows

- creator discovery and vetting;
- recurring audience monitoring;
- campaign research;
- creator-list enrichment.

Runs use the hosted [TikTok Profile Scraper](https://apify.com/apivault_labs/tiktok-profile-scraper). Actor usage is billed separately on Apify.

## License

[MIT](LICENSE)
