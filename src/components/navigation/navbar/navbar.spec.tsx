import { render, screen } from '@testing-library/react'

import { Navbar } from '.'

describe('NavbarMenu', () => {
  it('should renders pollen logo', () => {
    render(<Navbar />)

    const pollenLogo = screen.getAllByAltText('Pollen Logo')

    expect(pollenLogo).toHaveLength(1)
    expect(pollenLogo[0]).toHaveAttribute('src', '/pollen-logo.svg')
  })

  it('should renders two menuitem(s)', () => {
    render(<Navbar />)

    const menuItems = screen.getAllByRole('menuitem')

    expect(menuItems).toHaveLength(2)
  })

  it('should renders a navbar with user menu', () => {
    render(<Navbar />)

    const navbar = screen.getByTestId('navbar')
    const userMenu = screen.getByLabelText('user menu')

    expect(navbar).toContainElement(userMenu)
  })

  it('should renders a navbar with notifications menu', () => {
    render(<Navbar />)

    const navbar = screen.getByTestId('navbar')
    const notifications = screen.getByLabelText('notifications')

    expect(navbar).toContainElement(notifications)
  })
})
