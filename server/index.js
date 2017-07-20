const app = require('./app');
const config = require('config');

const PORT = process.env.port || config.servers.madeleine.port;

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});
