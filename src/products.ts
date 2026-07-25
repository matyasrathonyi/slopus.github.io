export type ProductKey = 'happy' | 'happy2'

export interface Product {
  key: ProductKey
  label: string
  home: string
  docsBase: string
  docsLabel: string
  repository: string
}

export const HAPPY: Product = {
  key: 'happy',
  label: 'Happy',
  home: '/',
  docsBase: '/docs',
  docsLabel: 'Documentation',
  repository: 'https://github.com/slopus/happy',
}

export const HAPPY2: Product = {
  key: 'happy2',
  label: 'Happy (2)',
  home: '/happy2/',
  docsBase: '/happy2/docs',
  docsLabel: 'Happy (2) Docs',
  repository: 'https://github.com/slopus/happy2',
}

export const products: Product[] = [HAPPY, HAPPY2]

export function productForPath(pathname: string): Product {
  return pathname === '/happy2' || pathname.startsWith('/happy2/') ? HAPPY2 : HAPPY
}

export function documentHref(product: Product, path: string) {
  return `${product.docsBase}/${path ? `${path}/` : ''}`
}
