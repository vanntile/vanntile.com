import { NextApiRequest, NextApiResponse } from 'next'

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (rq: NextApiRequest, rs: NextApiResponse, next: (err?: any) => any) => any,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default { runMiddleware }
