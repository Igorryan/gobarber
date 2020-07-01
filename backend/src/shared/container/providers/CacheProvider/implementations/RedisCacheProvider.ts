import ICacheProvider from '../models/ICacheProvider';
import cache from '@config/cache';
import Redis, { Redis as RedisClient } from 'ioredis';

class RedisCacheProvider implements ICacheProvider {

  private client: RedisClient;

  constructor(){
    this.client = new Redis(cache.config.redis);
  }

  public async save(key: string, value: string): Promise<void>{
    this.client.set(key, JSON.stringify(value));

  };

  public async recovery<T>(key: string): Promise<T | null>{
    const data = await this.client.get(key);

    if(!data){
      return null
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  };

  public async invalidate(key: string): Promise<void>{
    await this.client.del(key);
  };

  public async invalidatePrefix(prefix: string): Promise<void>{
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = await this.client.pipeline();

    keys.forEach(key => pipeline.del(key));

    await pipeline.exec();
  }

}

export default RedisCacheProvider;
