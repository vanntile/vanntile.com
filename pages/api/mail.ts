import { runMiddleware } from '@vlib/middleware'
import rateLimit from '@vlib/rateLimit'
import { Status } from '@vtypes/types.d'
import AbortController from 'abort-controller'
import Cors from 'cors'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import type { NextApiRequest, NextApiResponse } from 'next'
global.AbortController = AbortController

type Data = {
  status: Status
}

type Params = {
  message: string
  name: string
  email: string
}

const logger = console

const mailgun = new Mailgun(formData as any)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY as string,
  public_key: process.env.MAILGUN_PUBLIC_KEY,
})

const cors = Cors({
  methods: ['GET', 'POST'],
})

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 200, // Max users per second
})

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  // Check CORS
  await runMiddleware(req, res, cors)

  try {
    // Check for wait limiting
    await limiter.check(res, 5, 'CACHE_TOKEN')

    const { name, email, message } = req.body as Params

    try {
      await mg.messages.create(process.env.MAILGUN_DOMAIN as string, {
        from: `${name} <${process.env.MAILGUN_SMTP_LOGIN}>`,
        to: process.env.MAIL_RECEPIENT as string,
        subject: 'New message from contact form',
        text: `${email}: ${message}`,
      })

      res.status(200).json({ status: Status.Sent })
    } catch (err) {
      logger.error(err)
      res.status(500).json({ status: Status.Error })
    }
  } catch {
    logger.error(Status.RateLimited)
    res.status(429).json({ status: Status.RateLimited })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
}

export default handler
