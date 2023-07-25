import Welcom from '@/component/welcom'
import About from '@/component/about'
import Portfolio from '@/component/portfolio'
import Storage from '@/component/storage'
import { list } from '@/lib/supabaseStorage'
import { SUPABASE_SORT, SupabaseSearchParam, baseBucketName, SupabaseFileObject} from '@/lib/supabaseEntity'

export default async function Home() {

  const list = await get()
  
  console.log("◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇")
  console.log(list)
  console.log("◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇")

  return (
    <>
        <Welcom />
        <About />
        <Portfolio />
        <Storage />
        <p>----------</p>
        {list && list.map((item:SupabaseFileObject) => {
          return (
          <>
            <p>{item.public_url}</p>
            <img src={item.public_url} />
          </>
          )
        })}
    </>
  )
}


const get = async () => {
  let param:SupabaseSearchParam = {
    bucketName : baseBucketName,
    targetFolder : "images",
    page : 1,
    pageSize : 20,
    sort : {column:SUPABASE_SORT.UPDATED, order:'desc'},
    getDetail: true
  }

  let res = await list(param)
  return res

}