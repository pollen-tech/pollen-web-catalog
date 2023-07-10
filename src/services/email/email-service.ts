import { createTransport, type Transporter } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import { config } from '~/config'
import awaitToError from '~/utils/awaitToError'

export default class EmailService {
  static instance: EmailService
  // Singleton pattern
  static getInstance() {
    if (!this.instance) {
      this.instance = new EmailService()
    }
    return this.instance
  }

  private transporter: Transporter<SMTPTransport.SentMessageInfo>
  private salesEmails: string[]
  private from: string
  constructor() {
    this.salesEmails = config.salesEmails.split(',')
    const opts: SMTPTransport.Options = {
      host: config.smtp.host,
      port: parseInt(config.smtp.port),
      secure: config.smtp.secured,
      auth: {
        user: config.smtp.username,
        pass: config.smtp.password,
      },
    }
    this.from = config.smtp.email
    this.transporter = createTransport(opts)
  }
  async sendAdminNotifications(subject: string, html: string) {
    await Promise.all(
      this.salesEmails.map((email) => this.sendEmail(email, subject, html))
    )
  }
  async sendEmail(to: string, subject: string, html: string) {
    const [err] = await awaitToError(
      this.transporter.sendMail({
        from: this.from,
        to,
        subject,
        html,
      })
    )
    if (err) throw err
  }
}
