const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');
const app = require('./app');

const sever = http.createServer(app);

const PORT = config.PORT || 3003;
sever.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
