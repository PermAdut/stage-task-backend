import app from './app';
import config from './configs/config';
import { pool } from './utils/database';

pool
  .connect()
  .then(() => {
    console.log('postgres connected');
  })
  .catch((err) => {
    console.error('postgres connection failed', err);
  });

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
