import { NextApiRequest } from 'next'
import {getRequestCookie } from './cookie'
describe(`cookie.ts`, () => {
    describe(`getRequestCookie()`, () => {
        it(`should return cookie value when cookie is found`, () => {
            const req = {
                cookies: {
                    'some-cookie': JSON.stringify({
                        someKey: 'some value'
                    })
                }
            } 
            const cookie = getRequestCookie(req, 'some-cookie')
            expect(cookie).toEqual({
                someKey: 'some value'
            })
        })
    })
})