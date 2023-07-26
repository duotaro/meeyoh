import Welcom from '@/component/welcom'
import About from '@/component/about'
import Portfolio from '@/component/portfolio'
import Storage from '@/component/storage'
import { list } from '@/lib/supabaseStorage'
import { SUPABASE_SORT, SupabaseSearchParam, baseBucketName, SupabaseFileObject} from '@/lib/supabaseEntity'
import { CloudFlareFile, fileList } from '@/lib/cloudflare'
import { PNG, MP4 } from '@/utils/const'
export default async function Home() {

  const list = await get()
  
  console.log("◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇")
  console.log(fileList)
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
        <p>aaaaaaaaaaaaaa</p>
        {fileList && fileList.map((file:CloudFlareFile)=>{
          if(file.type == PNG){
            return (
              <img src={file.path} />
            )
          } else if (file.type == MP4){
            return (
              <video src={file.path} />
            )
          } else {
            return
          }
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