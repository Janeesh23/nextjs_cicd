import './globals.css'

export const metadata = {
  title: 'Simple Next.js App',
  description: 'A clean Next.js 14 app ready for Docker and production',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
