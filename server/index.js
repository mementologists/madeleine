const app = require('./app');

// const db = require('../db');

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`madeleine server listening on port ${PORT}!`);
  /* eslint-enable no-console */
});
