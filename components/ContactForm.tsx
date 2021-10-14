import { ChangeEvent, useEffect, useState } from 'react'
import { Status } from '@vlib/constants'

const SENT = 'Message sent'

const ContactForm: React.FC = () => {
  const [sent, setSent] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formError, setFormError] = useState<string>()

  useEffect(() => setDisabled(true), [])

  const validate = (target: EventTarget & (HTMLInputElement | HTMLTextAreaElement)) => {
    let error: string | undefined = undefined
    if (target.value === '') error = `${target.name} cannot be empty`
    else if (target.name == 'email' && !target.checkValidity()) error = 'Email is not valid'
    else error = undefined

    setFormError(error)
  }

  const sendContactForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formName === '' || formEmail === '' || formError === '') {
      setFormError('Missing fields')
      return
    }

    const res = await fetch('/api/mail', {
      body: JSON.stringify({
        name: formName,
        email: formEmail,
        message: formMessage,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { status } = (await res.json()) as { status: Status }

    status !== SENT ? setFormError(status) : setSent(true)
  }

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target
    target.name === 'name'
      ? setFormName(target.value)
      : target.name === 'email'
      ? setFormEmail(target.value)
      : setFormMessage(target.value)

    setDisabled(false)

    validate(target)
  }

  return sent ? (
    <div className="px-4 pb-4 border border-current">
      <h3>Message sent</h3>
    </div>
  ) : (
    <form action="#" className="px-4 pb-4 border border-current" onSubmit={sendContactForm}>
      <h3>Send me a message</h3>
      <div className="flex flex-col mb-3">
        <label>
          Your name *
          <input
            type="text"
            name="name"
            placeholder="A curious person"
            autoComplete="on"
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-900 focus:border-current focus:outline-none"
            value={formName}
            onChange={handleFormChange}
          />
        </label>
      </div>
      <div className="flex flex-col mb-3">
        <label>
          Email *
          <input
            type="email"
            name="email"
            placeholder="you.are.amazing@domain.com"
            autoComplete="on"
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-900 focus:border-current focus:outline-none"
            value={formEmail}
            onChange={handleFormChange}
          />
        </label>
      </div>
      <div className="flex flex-col mb-3">
        <label>
          Message *
          <textarea
            rows={5}
            name="message"
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-900 focus:border-current focus:outline-none"
            value={formMessage}
            onChange={handleFormChange}
          />
        </label>
      </div>
      {formError && <div className="px-4 py-2 text-red-500 capitalize border border-red-500">{formError}</div>}
      <button
        type="submit"
        disabled={disabled || !!formError}
        className={`${
          disabled || formError
            ? 'disabled:text-brand-secondary disabled:pointer-events-none disabled:hover:bg-transparent'
            : ''
        } w-full px-4 py-2 mt-4 text-xl font-semibold transition border border-current cursor-pointer duration-50 focus:outline-none hover:bg-brand-accent hover:text-gray-900`}
      >
        Send
      </button>
    </form>
  )
}

export default ContactForm
