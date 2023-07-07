import { type User } from '~/@types/user'
import { config } from '~/config'
import dayjs from 'dayjs'
import TemplateService from '~/templates/template-service'
import { TemplateName } from '~/templates/template-types'
import EmailService from '~/services/email/email-service'
export default class CatalogDomain {
  static instance: CatalogDomain
  // Singleton pattern
  static getInstance() {
    if (!this.instance) {
      this.instance = new CatalogDomain()
    }
    return this.instance
  }
  async contactSales(catalogId: string, user: User) {
    const [emailBuyerSubject, emailBuyerContent] =
      TemplateService.getInstance().loadEmailTemplate(
        TemplateName.EmailContactSalesBuyerNotification,
        {
          buyerName: user.buyer.name,
          catalogLink: `${config.lms.endpoint}/catalogs/export-data/${catalogId}`,
        }
      )
    const now = dayjs()
    const [emailSalesSubject, emailSalesContent] =
      TemplateService.getInstance().loadEmailTemplate(
        TemplateName.EmailContactSalesNotification,
        {
          buyerName: user.buyer.name,
          buyerEmail: user.email,
          catalogId: catalogId,
          dateSubmitted: now.format('DD MMMM YYYY'),
          timeSubmitted: now.format('hh.mm.ss A'),
          catalogLink: `${config.lms.endpoint}/catalogs/export-data/${catalogId}`,
        }
      )
    await Promise.all([
      EmailService.getInstance().sendAdminNotifications(
        emailSalesSubject,
        emailSalesContent
      ),
      EmailService.getInstance().sendEmail(
        user.email,
        emailBuyerSubject,
        emailBuyerContent
      ),
    ])
  }
}
