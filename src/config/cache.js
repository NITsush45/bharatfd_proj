const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  timeout: 5000,
});

redis.on("connect", () => console.log("Redis Connected"));
redis.on("error", (err) => {
  console.error("Redis Error:", err);
  process.exit(1);
});

module.exports = redis;
