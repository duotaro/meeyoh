import Welcom from '@/component/welcom'
import About from '@/component/about'
import Portfolio from '@/component/portfolio'
import Storage from '@/component/storage'
import { list, SupabaseSearchParam, SupabaseSearchSortParam } from '@/lib/supabaseStorage'

export default function Home() {

  let param:SupabaseSearchParam = {
    bucketName : "duotaro",
    targetFolder : "images",
    page : 1,
    pageSize : 20,
    sort : {column:'modified_at', order:'desc'}
  }

  let res = list(param)
  console.log("◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇")
  console.log(res)
  console.log("◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇")

  return (
    <>
        <Welcom />
        <About />
        <Portfolio />
        <Storage />
    </>
  )
}
