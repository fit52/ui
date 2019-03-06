const NodeCache = require('node-cache');

const DEFAULT_TTL = 6 * 60 * 60;

class Cache {
  constructor(ttl = DEFAULT_TTL) {
    this.cache = new NodeCache({
      stdTTL: ttl,
      checkperiod: ttl * 0.2,
      useClones: true,
    });
  }

  async get(key, dbFunc) {
    const cacheValue = this.cache.get(key);
    if (cacheValue) {
      return cacheValue;
    }

    const dbValue = await dbFunc();
    this.cache.set(key, dbValue);
    return dbValue;
  }
}

module.exports = Cache;
