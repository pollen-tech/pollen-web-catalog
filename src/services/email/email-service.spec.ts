import EmailService from "./email-service"

var mockSendEmail = jest.fn()
jest.mock('nodemailer', () => ({
    createTransport: () => ({
        sendMail: mockSendEmail
    }),
}))

describe(`email-service.ts`, () => {
    beforeAll(() => {
        mockSendEmail.mockReturnValue(Promise.resolve())
    })
    describe(`sendEmail()`, () => {
        it(`should send email to sales team when request is valid`, async () => {
            await EmailService.getInstance().sendEmail('some to', 'some subject', 'some html')
            expect(mockSendEmail).toBeCalledWith({"from": "some-from@mail.com", "html": "some html", "subject": "some subject", "to": "some to"})
        })
    })
})