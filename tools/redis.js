const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  username: process.env.REDIS_USER_NAME,
  password: process.env.REDIS_PASSWORD,
});

(async () => {
  await redisClient.connect();
})();

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

async function checkRedisCache(req, res, next) {
  const key = req.originalUrl.split("?")[0]; // Extract route for caching

  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.json({ data: JSON.parse(cachedData) }); // Send cached data if found
    }
  } catch (err) {
    console.error("Error retrieving data from Redis:", err);
  }

  next(); // Proceed to MongoDB operations if not found in cache
}

module.exports = { checkRedisCache, redisClient };
