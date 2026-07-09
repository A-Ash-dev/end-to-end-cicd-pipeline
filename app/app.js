const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from the End-to-End CI/CD demo app!',
    version: process.env.APP_VERSION || 'local',
  });
});

// Used by Kubernetes liveness/readiness probes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Only start the server if this file is run directly (not when imported by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;
