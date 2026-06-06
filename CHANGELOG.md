# Changelog

## 0.1.0

- Initial release.
- `TikTok Profile` node: scrape one or more TikTok profiles by username.
- Returns followers, likes, videos, bio, verification, plus actor-side
  creator-tier and engagement-rate signals.
- Proxy options (residential/datacenter) and per-username retries.
- `Apify API` credentials with token test against `/users/me`.
- Calls the `apivault_labs/tiktok-profile-scraper` actor via
  `run-sync-get-dataset-items`.
