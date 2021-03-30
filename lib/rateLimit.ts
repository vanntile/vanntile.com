import LRUCache from 'lru-cache'
import { NextApiResponse } from 'next'

interface Options {
  interval?: number
  uniqueTokenPerInterval?: number
}

type RateLimitResponse = (res: NextApiResponse, limit: number, token: string) => Promise<void>

const rateLimit = ({ uniqueTokenPerInterval, interval }: Options): { check: RateLimitResponse } => {
  const tokenCache = new LRUCache<string, number[]>({
    max: uniqueTokenPerInterval ?? 500,
    maxAge: interval ?? 60000,
  })

  return {
    check: (res: NextApiResponse, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = tokenCache.get(token) ?? [0]
        if (tokenCount[0] === 0) tokenCache.set(token, tokenCount)
        tokenCount[0] += 1

        const isRateLimited = tokenCount[0] > limit
        res.setHeader('X-RateLimit-Limit', limit)
        res.setHeader('X-RateLimit-Remaining', isRateLimited ? 0 : limit - tokenCount[0])

        return isRateLimited ? reject() : resolve()
      }),
  }
}

export default rateLimit
