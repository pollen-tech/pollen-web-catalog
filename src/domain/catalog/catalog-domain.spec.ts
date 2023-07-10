import EmailService from "~/services/email/email-service"
import TemplateService from "~/templates/template-service"
import CatalogDomain from "./catalog-domain"
import { User } from "~/@types/user"

const loadEmailTemplateMock = jest.fn()
const sendEmailMock = jest.fn()
const sendAdminNotificationsMock = jest.fn()

TemplateService.prototype.loadEmailTemplate = loadEmailTemplateMock
EmailService.prototype.sendEmail = sendEmailMock
EmailService.prototype.sendAdminNotifications = sendAdminNotificationsMock

describe(`catalog-domain.ts`, () => {
    describe(`.contactSales()`, () => {
        beforeAll(() => {
            loadEmailTemplateMock.mockReturnValue([
                'some subject',
                'some content'
            ])
            sendEmailMock.mockReturnValue(Promise.resolve())
            sendAdminNotificationsMock.mockReturnValue(Promise.resolve())
        })
        it(`should send email to sales team when request is valid`, () => {
            const user = {
                buyer: {
                    name: 'some buyer',
                    country: {
                        code: 'SG'
                    } 
                },
                email: 'someemail@gmail.com'
            } as User
            const catalogId = 'some-catalog-id'
            CatalogDomain.getInstance().contactSales(catalogId, user)
            expect(loadEmailTemplateMock).toHaveBeenCalledWith("email/contact-sales-buyer-notification", {"buyerName": "some buyer", "catalogLink": "/catalogs/export-data/some-catalog-id"})
            expect(sendEmailMock).toBeCalled()
            expect(sendAdminNotificationsMock).toBeCalled()
        })
    })
})