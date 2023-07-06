import { type AnchorHTMLAttributes, type DetailedHTMLProps } from 'react'

export default function PlainLink(
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) {
  return <a {...props} />
}
