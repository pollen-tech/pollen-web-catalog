export interface User {
  id: string
  name: string
  firstname: string
  lastname: string
  email: string
  phoneNumber: string
  categoryOfInterest: string[]
  monthlyOrderVolume: string
  canPurchaseNearExpiry: boolean
  status: string
  createdAt: Date
  updatedAt: Date
  verified: boolean
  verificationCode: string
  verificationCodeExpiry: Date
  buyer: Buyer
  targetResaleMarket: Country[]
}

export interface Buyer {
  id: string
  name: string
  type: string
  createdAt: Date
  country: Country
}

export interface Country {
  code: string
  name: string
  phoneCode: string
}
