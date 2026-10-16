import express from 'express';

const app = express();

const PORT = 3000;

app.get('/api/workflows', (_req, res) => {
  console.log('workflows{}')
  res.json({
    status: 'ok',
    message: 'FlowCraft backend is running',
    data: [],
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'FlowCraft backend is running',
  });
});

app.listen(PORT, () => {
  console.log('=================================');
  console.log(' FlowCraft Backend');
  console.log('=================================');
  console.log(` Server running on port ${PORT}`);
  console.log(` http://localhost:${PORT}`);
  console.log('=================================');
});

