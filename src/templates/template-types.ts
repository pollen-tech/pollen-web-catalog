import {
  template as emailContactSalesBuyerNotificationTemplate,
  subject as emailContactSalesBuyerNotificationSubject,
} from './email/contact-sales-buyer-notification'
import {
  template as emailContactSalesNotificationTemplate,
  subject as emailContactSalesNotificationSubject,
} from './email/contact-sales-notification'

export enum TemplateName {
  EmailContactSalesBuyerNotification = 'email/contact-sales-buyer-notification',
  EmailContactSalesNotification = 'email/contact-sales-notification',
}

export interface TemplateDataEmailContactSalesBuyerNotification {
  buyerName: string
  catalogLink: string
}
export interface TemplateDataEmailContactSalesNotification {
  catalogId: string
  buyerName: string
  buyerEmail: string
  dateSubmitted: string
  timeSubmitted: string
  catalogLink: string
}

export interface TemplateDataType {
  [TemplateName.EmailContactSalesBuyerNotification]: TemplateDataEmailContactSalesBuyerNotification
  [TemplateName.EmailContactSalesNotification]: TemplateDataEmailContactSalesNotification
}

export const Templates: Record<
  keyof TemplateDataType,
  {
    template: string
    subject: string
  }
> = {
  [TemplateName.EmailContactSalesBuyerNotification]: {
    subject: emailContactSalesBuyerNotificationSubject,
    template: emailContactSalesBuyerNotificationTemplate,
  },
  [TemplateName.EmailContactSalesNotification]: {
    subject: emailContactSalesNotificationSubject,
    template: emailContactSalesNotificationTemplate,
  },
}
