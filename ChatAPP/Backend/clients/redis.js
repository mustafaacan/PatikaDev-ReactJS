const redis = require("redis");

const getClient = () => {
  return redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB,
    prefix: process.env.REDIS_KEY_PREFIX,
  });
};

module.exports.getClient = getClient;
