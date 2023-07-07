import TemplateService from "./template-service"
import { TemplateName } from "./template-types"

describe(`template-service.ts`, () => {
    describe(`loadEmailTemplate`, () => {
        it(`should return [subject, html-template] with parsed data when template is contact sales buyer notification`, () => {
            const [, template] = TemplateService.getInstance().loadEmailTemplate(
                TemplateName.EmailContactSalesBuyerNotification,
                {
                  buyerName: 'some buyer',
                  catalogLink: `https://some-endpoint.com/catalogs/export-data/some-catalog`,
                })
                expect(template).toContain('some buyer')
                expect(template).toContain('https://some-endpoint.com/catalogs/export-data/some-catalog')
        })
    })
})