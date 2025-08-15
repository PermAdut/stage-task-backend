import app from './app';
import config from './configs/config';
import { pool } from './utils/database';

pool
  .connect()
  .then(() => {
    console.log('postgres connected');
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error('postgres connection failed', err);
  });
