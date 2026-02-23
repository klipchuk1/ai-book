require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.GEMINI_API_KEY;
const AUTH_SECRET = process.env.AUTH_SECRET;
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

app.use(express.json({ limit: '50mb' }));
app.use(cors());

function authenticate(req, res, next) {
  const token = req.headers['x-proxy-secret'];
  if (token !== AUTH_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/generate', authenticate, async (req, res) => {
  const { model, contents, generationConfig } = req.body;

  if (!model || !contents) {
    return res.status(400).json({ error: 'Missing model or contents' });
  }

  const url = `${GEMINI_BASE}/${model}:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, generationConfig }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(502).json({ error: 'Failed to reach Gemini API', details: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Gemini proxy running on port ${PORT}`);
});
