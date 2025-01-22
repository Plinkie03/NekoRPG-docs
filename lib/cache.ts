import NodeCache from "node-cache";

// Initialize cache with a default TTL of 2 hours (7200 seconds)
const cache = new NodeCache({ stdTTL: 7200 });

export const getCache = (key: string) => {
  return cache.get(key);
};

export const setCache = (key: string, value: any) => {
  cache.set(key, value);
};

export const deleteCache = (key: string) => {
  cache.del(key);
};
