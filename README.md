# flat-notifier

Small project to crawl flat-ads from ebay-Kleinanzeigen every 10 minutes and notifies me via discord message if it found a new flat.

## Deploy

Configured aws-cli and aws-cdk is required to deploy to aws. 

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Deploy
npm run deploy
```

To keep the deployment package small I use discord and JSDOM as a lambda layer. Check [https://github.com/mathiswi/nodejs-aws-lambda-layers](https://github.com/mathiswi/nodejs-aws-lambda-layers) for details.

The discord-bot requires config.json in `src/ebay/`:

```json
{
  "token": BOT_TOKEN,
  "userId": USER_ID
}
```

