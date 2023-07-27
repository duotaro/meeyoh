
import Image from 'next/image'
import PortfolioList from './portfolioList'
import { getSpabaseList } from '@/lib/supabaseStorage'
import { SUPABASE_SORT, SupabaseSearchParam, baseBucketName, SupabaseFileObject} from '@/lib/supabaseEntity'
import { MeeYohFile } from '@/utils/entity'

export default async function Portfolio() {

  const list = await get() || []

  return (
      <section id="portfolio" className="portfolio section-bg">
      <div className="container">
        <div className="section-title">
          <h2>Portfolio</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>
        <PortfolioList list={list}/>
      </div>
    </section>
  )
}

/**
 * supabaseから画像を取得します
 * @returns 
 */
const get = async () => {
  let param:SupabaseSearchParam = {
    bucketName : baseBucketName,
    targetFolder : "images",
    page : 1,
    pageSize : 20,
    sort : {column:SUPABASE_SORT.UPDATED, order:'desc'},
    getDetail: true
  }

  let res = await getSpabaseList(param)
  return res

}
