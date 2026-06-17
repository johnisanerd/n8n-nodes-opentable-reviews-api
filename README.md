# n8n-nodes-opentable-reviews-api

An [n8n](https://n8n.io/) community node that fetches OpenTable restaurant reviews and returns structured records: review content, overall rating, dates, and reviewer details. It is backed by the [OpenTable Reviews API](https://apify.com/johnvc/opentable-reviews-api?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a restaurant ID, and it returns one item per review with the content, overall rating, reviewer name, dined-at date, and submitted-at date. It also works as an **AI Agent tool**, so an agent can read restaurant reviews on demand. This is useful for **reputation monitoring** and hospitality research.

- Fetch reviews for any OpenTable restaurant by ID or slug
- Control how many reviews to return
- Optionally include a restaurant summary record
- Choose how much data to return per review: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-opentable-reviews-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **OpenTable Reviews** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**Review > Get** returns reviews for a restaurant.

| Parameter | Description |
| --- | --- |
| Restaurant ID | The OpenTable restaurant ID or slug. Required. |
| Maximum Reviews per Restaurant | How many reviews to return. |
| Include Restaurant Summary | Include a restaurant summary record alongside the reviews. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

Each review is returned as its own n8n item. The **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `reviewId`, `restaurantId`, `content`, `overallRating`, `user`, `dinedAt`, and `submittedAt`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns for each review, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `result_type` | string | Record type, for example `review` |
| `restaurant_id` | string | OpenTable restaurant ID |
| `position` | integer | Order of the review |
| `review_id` | string | Unique review identifier |
| `content` | string | Review text |
| `dined_at` | string | When the reviewer dined (ISO 8601) |
| `submitted_at` | string | When the review was submitted (ISO 8601) |
| `rating` | object | Overall, food, service, ambience, and value ratings |
| `user` | object | Reviewer name, review count, and location |
| `fetched_at` | string | When the review was fetched (ISO 8601) |

## Example workflows

### 1. Monitor a restaurant's reviews

1. **Schedule Trigger**: run daily.
2. **OpenTable Reviews**: Restaurant ID your restaurant, Output `Simplified`.
3. **Remove Duplicates** then **Slack**: alert on new reviews with `overallRating` and `content`.

### 2. Sentiment analysis pipeline

1. **Manual Trigger**.
2. **OpenTable Reviews**: a restaurant, Maximum Reviews `100`.
3. **AI / Sentiment** node: score each review's `content`.

### 3. Let an AI Agent summarize reviews

1. **AI Agent** node.
2. Attach **OpenTable Reviews** as a tool.
3. Ask "What do diners say about this restaurant?" The agent calls the node (in Simplified mode) and summarizes the reviews.

## Pricing

This node calls the [OpenTable Reviews API](https://apify.com/johnvc/opentable-reviews-api?fpr=9n7kx3) on Apify, which is billed **pay-per-result**, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/opentable-reviews-api?fpr=9n7kx3) for current rates.

## Resources

- [OpenTable Reviews API on Apify](https://apify.com/johnvc/opentable-reviews-api?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-opentable-reviews-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
