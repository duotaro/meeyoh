
import PortfolioList from './portfolioList'
import { getSpabaseList } from '@/lib/supabaseStorage'
import { SUPABASE_SORT, SupabaseSearchParam, baseBucketName, SupabaseFileObject} from '@/lib/supabaseEntity'
import { getMeeYohPlayListItems, PlayListItem, PlayListItems, PlayListItemsResponse } from "@/lib/youtube";
import { MeeYohFile } from '@/utils/entity';
import { YOUTUBE } from '@/utils/const';

class MeeYohFiles {
  list:MeeYohFile[] = []
  playList:PlayListItem[] = []
}

export default async function Portfolio() {

  const item:MeeYohFiles = await get() || new MeeYohFiles()

  return (
    <section id="portfolio" className="portfolio section-bg">
      <div className="container">
        <div className="section-title">
          <h2>Portfolio</h2>
          {/* <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p> */}
        </div>
        <PortfolioList list={item.list} playList={item.playList}/>
      </div>
    </section>
  )
}

/**
 * supabaseから画像を取得します
 * @returns 
 */
const get = async () =>  {
  let param:SupabaseSearchParam = {
    bucketName : baseBucketName,
    targetFolder : "images",
    page : 1,
    pageSize : 20,
    sort : {column:SUPABASE_SORT.UPDATED, order:'desc'},
    getDetail: true
  }

  // supabaseから取得
  let res = await getSpabaseList(param)
  if(!res){
    res = []
  }

  // youtubeから取得
  const youtubeRes:PlayListItemsResponse = await getMeeYohPlayListItems()
  var playlistItems = youtubeRes.items;
  if(!youtubeRes || youtubeRes.pageInfo.totalResults == 0 || !playlistItems){
    playlistItems = []
  }
  // MeeYohFileにconvert
  // const youtubeItems:MeeYohFile[] = playlistItems.map((item:PlayListItem) => {
  
  //   const videoId = item.snippet.resourceId.videoId
  //   const thumbnail = item.snippet.thumbnails.medium.url
  //   return new MeeYohFile(videoId, [], thumbnail, YOUTUBE)
  // })
  return {
    list: res,
    playList: playlistItems
  }
}

