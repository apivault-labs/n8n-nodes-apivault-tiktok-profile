# n8n-nodes-apivault-tiktok-profile

An [n8n](https://n8n.io) community node for the **TikTok Profile Scraper** — get real-time TikTok profile data by username: followers, likes, total videos, bio, verification status, plus creator-tier and engagement-rate signals.

No TikTok API key. Pay-as-you-go, no monthly subscription. The scraping (residential proxy rotation, retries, WAF bypass, JSON extraction) runs server-side on [Apify](https://apify.com); this node is a thin connector you drive with your own Apify API token.

Built by **[apivault_labs](https://apify.com/apivault_labs)** — see [all our actors](https://apify.com/apivault_labs).

## What you get per profile

- **Stats**: followers, following, likes, videos
- **Profile**: nickname, bio, verification status, avatar, region
- **Derived signals**: `creator_tier` (nano → mega), `engagement_rate_pct`, `avg_likes_per_video`, `influence_score`
- **`profile_url`** for downstream steps

## Installation

In your n8n instance:

1. Go to **Settings → Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-apivault-tiktok-profile`
4. Confirm and install

## Credentials

This node uses an **Apify API token**:

1. Create a free account at [apify.com](https://apify.com)
2. Go to **Apify Console → Settings → Integrations** and copy your **API token**
3. In n8n, create new **Apify API** credentials and paste the token

A free Apify account includes monthly usage credits, so you can try it without a card.

## Usage

- **Usernames** — one or more TikTok handles separated by commas or new lines (the leading `@` is optional), e.g. `khaby.lame, charlidamelio`
- **Use Apify Proxy** / **Proxy Group** — residential is recommended (TikTok blocks datacenter IPs aggressively)
- **Max Retries** — per-username retry attempts with a fresh proxy IP

Each username produces one output item.

## Pricing

Billed per profile through Apify (pay-per-event): **$1 / 1,000 profiles** ($0.001 each). You only pay for profiles actually returned.

## Use cases

- **Influencer discovery & vetting** — filter by `creator_tier` and `engagement_rate_pct`
- **Brand-safety / UGC vetting** — check verification and bio before partnering
- **Competitor & market research** — track follower/like counts over time
- **Lead lists** — enrich a list of creators with stats in one workflow

## Resources

- [TikTok Profile Scraper actor on Apify](https://apify.com/apivault_labs/tiktok-profile-scraper)
- [All actors by apivault_labs](https://apify.com/apivault_labs)
- Prefer Python? Use the [Python SDK](https://github.com/apivault-labs/tiktok-profile-scraper-python)
- [n8n community nodes docs](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)

## Keywords

`tiktok` `tiktok-scraper` `tiktok-profile` `tiktok-followers` `tiktok-stats` `influencer-marketing` `influencer-discovery` `creator-economy` `engagement-rate` `social-media-scraper` `n8n` `apify`
