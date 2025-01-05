import "@/styles/globals.css"
import { Inter } from 'next/font/google'
import { Navbar } from "@/components/navbar"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

const title = 'OUTER REACH'
const description = "Where the bells of progress ring"
const url = 'https://outerreach.xyz/'
const image =`${url}og.png`

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    images: [{url: image}],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
          <Analytics />
          <Navbar />
          {children}
      </body>
    </html>
  )
}
