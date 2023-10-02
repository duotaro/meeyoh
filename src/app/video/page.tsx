import Link from "next/link";
import { getMeeYohPlayListItems, PlayListItem, PlayListItems, PlayListItemsResponse } from "@/lib/youtube";
import ContentModal from "@/component/page/contentModal";

export default async function Video() {
  const playList:PlayListItems = await get();

  return (
    <>
    {playList.map((item:PlayListItem) => {
        const videoId = item.snippet.resourceId.videoId
        const thumbnail = item.snippet.thumbnails.medium.url
        return (
          <>
            <img src={thumbnail} data-bs-toggle="modal" data-bs-target={`#movieModal-${videoId}`} />
            {/* <ContentModal videoId={videoId} /> */}
          </>
        )
    })}
    {/* <video controls src="https://pub-06900595aaf543b1af0a94853cb05c88.r2.dev/meeyoh/production/media/misaki_bread.m4v"></video> */}
    </>
  )
}

//https://www.youtube.com/watch?v=FNeJDIHxLOs
// export const getStaticPaths:GetStaticPaths = async () => {
//     let playList = await getMeeYohPlayLists();
//     return {
//       paths: playList.map((video:any) => ({ params: { video:  video } })),
//       fallback: false,
//     };
//   };
async function get() {
  const res:PlayListItemsResponse = await getMeeYohPlayListItems()
  var playlistItems = res.items;
  if(!res || res.pageInfo.totalResults == 0 || !playlistItems){
    return []
  }
  
  return res.items
}
  