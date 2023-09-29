import { getMeeYohPlayListItems, getMeeYohDetail, PlayListItem, PlayListItems, PlayListItemsResponse} from "@/lib/youtube";
import YoutubeItem from "@/component/page/youtube";
import { YoutubeOption } from "@/component/page/youtube";

export default async function VideoDetail({
  params:{videoId}
}: {
  params: {videoId:string}
}) {
  const item:PlayListItem = await get(videoId);

  // 音源をここで作成する。音源ファイルを持ってもいいし、apiで取得してもいいし、youtubeでもいい
  // youtubeでできるか確認する


  let option:YoutubeOption = new YoutubeOption()

  return (
    <>
      <a href={`https://www.youtube.com/watch?${item.snippet.resourceId.videoId}`} >{item.snippet.title}</a>
      <p>{item.snippet.resourceId.videoId}</p>
      <p>https://www.youtube.com/watch?{item.snippet.resourceId.videoId}</p>
      <img src={item.snippet.thumbnails.medium.url} />
      <YoutubeItem videoId={item.snippet.resourceId.videoId} option={option}/>
    </>
  )
}

/**
 * 再生リストからアイテム一覧取得
 * path作成
 * @returns 
 */
async function getList() {
  const res:PlayListItemsResponse = await getMeeYohPlayListItems()
  var playlistItems = res.items;
  if(!res || res.pageInfo.totalResults == 0 || !playlistItems){
    return []
  }
  return res.items
}

/**
 * 
 * @param videoId 詳細取得
 * @returns 
 */
async function get(videoId:string) {
  const res:PlayListItem = await getMeeYohDetail(videoId)
  return res
}
  
export async function generateStaticParams() {
  const playlistItems:PlayListItems = await getList()
  return playlistItems.map((item:PlayListItem) => ({
    videoId: item.snippet.resourceId.videoId
  }))
}