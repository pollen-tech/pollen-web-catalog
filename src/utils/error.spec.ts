import ApiError from "./error"

describe(`error.ts`, () => {
    describe(`ApiError`, () => {
        it(`should create Api Error Instance when initiate the ApiError`, () => {
            const apiError = new ApiError('some message', 400, new Error('some error'))
            expect(apiError).toBeInstanceOf(ApiError)
            expect(apiError.message).toEqual('some message')
            expect(apiError.statusCode).toEqual(400)
            expect(apiError.originError).toBeInstanceOf(Error)
            expect(apiError.originError?.message).toEqual('some error')
        })
    })
})