export type CacheModuleOptions = {
  global?: boolean;
  /** max number of items in memory */
  max?: number;
  /** ttl in seconds */
  ttl?: number;
};

export const CACHE_OPTIONS = "CACHE_OPTIONS";
