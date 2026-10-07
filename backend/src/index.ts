import 'dotenv/config';
import app from './app';
import { config } from './config/env';

app.listen(config.port, () => {
  console.log(`[server] Backend is running on http://localhost:${config.port}`);
  console.log(`[server] Environment: ${config.nodeEnv}`);
});

