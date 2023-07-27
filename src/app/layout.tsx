import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/component/common/nav'
import Welcom from '@/component/page/welcom'
import Footer from '@/component/common/footer'
import Script from 'next/script'
import { FirebaseContextProvider } from '@/context/firebase.context'
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    
        <title>Lonely Bootstrap Template - Index</title>
        <meta content="" name="description" />
        <meta content="" name="keywords" />
        <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
        <link href="/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
        <link href="/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />
        <link href="/css/style.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        
        
        <Nav />
        <main>
          <FirebaseContextProvider>{children}</FirebaseContextProvider>
        </main>
        <Footer />
        <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>    
        
        <Script src="/vendor/purecounter/purecounter_vanilla.js"></Script>
        <Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>
        <Script src="/vendor/glightbox/js/glightbox.min.js"></Script>
        <Script src="/vendor/isotope-layout/isotope.pkgd.min.js"></Script>
        <Script src="/vendor/swiper/swiper-bundle.min.js"></Script>
        <Script src="/vendor/waypoints/noframework.waypoints.js"></Script>
        <Script src="/vendor/php-email-form/validate.js"></Script>
        <Script src="/js/main.js"></Script>
      </body>
    </html>
  )
}
