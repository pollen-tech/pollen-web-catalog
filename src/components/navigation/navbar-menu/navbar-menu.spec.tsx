import { render, screen } from '@testing-library/react'

import { NavbarMenu } from '.'

describe('NavbarMenu', () => {
  it('should renders two menuitem', () => {
    render(<NavbarMenu />)

    const menuItems = screen.getAllByRole('menuitem')

    expect(menuItems).toHaveLength(2)
  })

  it('should renders a navbar with user menu, with default data-state as `closed`', () => {
    render(<NavbarMenu />)

    const userMenu = screen.getByLabelText('user menu')

    expect(userMenu).toBeInTheDocument()
    expect(userMenu.getAttribute('data-state')).toEqual('closed')
  })

  it('should renders a navbar with notifications menu', () => {
    render(<NavbarMenu />)

    const notifications = screen.getByLabelText('notifications')

    expect(notifications).toBeInTheDocument()
    expect(notifications.getAttribute('data-state')).toEqual('closed')
  })
})
