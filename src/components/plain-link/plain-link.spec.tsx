import { render, screen } from "@testing-library/react"
import PlainLink from "."

describe('PlainLink', () => {
    it('should renders pollen logo', () => {
      render(<PlainLink>Some link</PlainLink>)
      const link = screen.getByTestId('plain-link')
      expect(link).toContainHTML("Some link")
    })
})