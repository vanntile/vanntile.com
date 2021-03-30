import { runMiddleware } from '@vlib/middleware'
import rateLimit from '@vlib/rateLimit'
import { Status } from '@vtypes/types.d'
import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import mailGun from 'nodemailer-mailgun-transport'

type Data = {
  status: Status
}

type Params = {
  message: string
  name: string
  email: string
}

const logger = console

const transporter = nodemailer.createTransport(
  mailGun({
    auth: {
      api_key: process.env.MAILGUN_API_KEY as string,
      domain: process.env.MAILGUN_DOMAIN,
    },
  }),
)

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
      await transporter.sendMail({
        from: { name, address: process.env.MAILGUN_SMTP_LOGIN as string },
        to: { name: process.env.RECEPIENT_NAME as string, address: process.env.MAIL_RECEPIENT as string },
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
