export enum CacheStore {
  Memory = 'memory',
  Redis = 'redis',
  File = 'file',
}

export type CacheModuleOptions =
  | {
      store: 'memory';
      /** max number of items in memory */
      max: number;
      /** ttl in seconds */
      ttl: number;
    }
  | {
      store: 'redis';
    };
