import Welcom from '@/component/page/welcom'
import About from '@/component/page/about'
import Portfolio from '@/component/page/portfoli/portfolio'
import Storage from '@/component/page/storage'
import { MEE_NAME, YOH_NAME } from '@/utils/const'



export default async function Home() {

  return (
    <>
        <Welcom />
        <section id="about" className="about">
          <About name={MEE_NAME}/>
          <About name={YOH_NAME}/>
        </section>
        <Portfolio />
        {/* <Storage /> */}
    </>
  )
}