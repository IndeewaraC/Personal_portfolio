import express from 'express';
import { exec } from 'child_process';
import crypto from 'crypto';

const app = express();
app.use(express.json());


const WEBHOOK_SECRET = process.env.CONTENTFUL_WEBHOOK_SECRET;


const GITHUB_REPO = process.env.GITHUB_REPO; 
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.post('/webhook', (req, res) => {
 
  if (WEBHOOK_SECRET) {
    const signature = req.headers['x-contentful-signature'];
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (signature !== `sha256=${expectedSignature}`) {
      return res.status(401).send('Invalid signature');
    }
  }

  console.log('Received Contentful webhook:', req.body.sys.type);

 
  const curlCommand = `curl -X POST \
    -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/repos/${GITHUB_REPO}/dispatches \
    -d '{"event_type": "contentful-update"}'`;

  exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Error triggering workflow:', error);
      return res.status(500).send('Failed to trigger workflow');
    }

    console.log('Workflow triggered successfully');
    res.status(200).send('Webhook processed successfully');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});