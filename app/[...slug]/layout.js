import '../globals.css'
// contants
import { defaultMetadata } from '@/lib/constants'
// components
import { HeaderContainer, FooterContainer } from '@/components/layouts'
import { HtmlHead, ShowCookie, BodyScript } from '@/app/layouts'

export const metadata = {
  ...defaultMetadata
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <HtmlHead/>

      <body className="antialiased">
        <div>
          <HeaderContainer/>

          <main>
            {children}
          </main>

          <FooterContainer/>
        </div>

        {/* Body Script */}
        <BodyScript/>

        {/* cookie action button */}
        <ShowCookie/>
      </body>
    </html>
  )
}

// primary
// fill-link
