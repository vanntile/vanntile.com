import { Container } from '@vcomponents'
import { Status } from '@vtypes/types'
import { useState } from 'react'

const Contact: React.FC = (): JSX.Element => {
  const [status, setStatus] = useState('')
  const email = async () => {
    const res = await fetch('/api/mail', {
      body: JSON.stringify({
        name: 'Your new fan',
        email: 'valpraim@gmail.com',
        message: 'You are awesome, just my favourite dev',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { status: ret } = (await res.json()) as { status: Status }
    setStatus(ret)
  }

  return (
    <Container title="Contact form">
      <div>This should be a contact form</div>
      <button onClick={email}>Click me to send message</button>
      {status && <div className="block p-4 mt-2 text-gray-900 bg-blue-100">{status}</div>}
    </Container>
  )
}

export default Contact
