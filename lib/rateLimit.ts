import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(), // Load from UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
    limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute per IP
    analytics: true,
})
