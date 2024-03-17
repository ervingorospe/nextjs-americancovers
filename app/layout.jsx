import './home.css';
// contants
import { defaultMetadata } from '@/lib/constants'
import { HtmlHead } from '@/app/layouts'

export const metadata = {
  title: `We're now part of Sunbelt Rentals`,
  description: ''
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <HtmlHead/>

      <body className="antialiased">
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

// primary
// fill-link
