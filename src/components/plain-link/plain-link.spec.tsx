import { render, screen } from "@testing-library/react"
import PlainLink from "."

describe('PlainLink', () => {
    it('should renders pollen logo', () => {
      render(<PlainLink>Some link</PlainLink>)
      const link = screen.getAllByText('Some Link')
      expect(link).toHaveLength(1)
    })
})