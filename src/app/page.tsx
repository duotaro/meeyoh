import Image from 'next/image'
import styles from './page.module.css'
import Footer from '@/component/footer'
import About from '@/component/about'
import Portfolio from '@/component/portfolio'


export default function Home() {
  return (
    <>
      <main id="main">
    
        <About />
        <Portfolio />
    
      </main>
    
      <Footer />
    
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>    
    </>
  )
}
