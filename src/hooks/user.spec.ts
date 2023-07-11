import axios from 'axios'
import React from 'react'
import { useUser } from './user'

jest.mock('axios')

describe(`src/hooks/user.ts`, () => {
  describe('.useUser()', () => {
    describe('.getMe()', () => {
      it(`should get current user when request is valid`, async () => {
        const mockData = {
          id: 'some-id',
          firstname: 'some-first-name',
          lastname: 'some-last-name',
          email: 'some-email',
          createdAt: 'some-date',
          updatedAt: 'some-date',
        }
        // mock axios.create()
        const mockReq = {
          interceptors: {
            request: {
              use: jest.fn(),
            },
            response: {
              use: jest.fn(),
            },
          },
          post: jest.fn(),
        }
        mockReq.post.mockResolvedValue({
          data: {
            buyerProfile: JSON.stringify(mockData),
          },
        })
        ;(axios.create as jest.Mock).mockReturnValue(mockReq)

        // mock useState
        const mockSetLoading = jest.fn()
        const mockSetError = jest.fn()
        const mockUseState = jest.spyOn(React, 'useState')
        mockUseState.mockImplementationOnce(() => [false, mockSetLoading])
        mockUseState.mockImplementationOnce(() => [null, mockSetError])

        const { getMe } = useUser()
        const user = await getMe()
        expect(user.id).toBe(mockData.id)
        expect(user.firstname).toBe(mockData.firstname)
        expect(user.lastname).toBe(mockData.lastname)
        expect(user.email).toBe(mockData.email)
      })
    })
  })
})
