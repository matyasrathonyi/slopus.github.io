export type ProductKey = 'happy' | 'happy2'

export interface Product {
  key: ProductKey
  label: string
  /** Shown in the product switch, where the two products are named side by side. */
  switchLabel?: string
  home: string
  docsBase: string
  docsLabel: string
  repository: string
}

export const HAPPY: Product = {
  key: 'happy',
  label: 'Happy',
  switchLabel: 'Happy Mobile',
  home: '/',
  docsBase: '/docs',
  docsLabel: 'Documentation',
  repository: 'https://github.com/slopus/happy',
}

export const HAPPY2: Product = {
  key: 'happy2',
  label: 'Happy Desktop',
  home: '/desktop/',
  docsBase: '/desktop/docs',
  docsLabel: 'Happy Desktop Docs',
  repository: 'https://github.com/slopus/happy-desktop',
}

export const products: Product[] = [HAPPY, HAPPY2]

export function productForPath(pathname: string): Product {
  return pathname === '/desktop' || pathname.startsWith('/desktop/') ? HAPPY2 : HAPPY
}

export function documentHref(product: Product, path: string) {
  return `${product.docsBase}/${path ? `${path}/` : ''}`
}
