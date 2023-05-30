import Image from 'next/image'

import { NavbarMenu } from '~/components/navigation/navbar-menu'

export function Navbar() {
  return (
    <nav className="w-full bg-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Image src="/pollen-logo.svg" width={56} height={56} alt="Pollen" />
        <NavbarMenu />
      </div>
    </nav>
  )
}
