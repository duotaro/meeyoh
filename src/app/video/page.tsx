import Link from "next/link";
import { getMeeYohPlayListItems, PlayListItem, PlayListItems, PlayListItemsResponse } from "@/lib/youtube";
import YoutubeItem from "@/component/youtube";
import MovieModal from "@/component/movieModal";

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
            <MovieModal videoId={videoId} />
          </>
        )
    })}
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
  
  console.log("◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇")
  console.log(res)
  playlistItems.map((item) => {
    console.log(item)
    console.log(item.snippet)
  })
  console.log("◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇")
  return res.items
}
  
// https://www.youtube.com/watch?v=FNeJDIHxLOs&list=PL2ufUyfB4mVqiwmWKNu3k_73bmyJ5BR30
  // export const generateStaticParams:GetStaticProps = async ({
  //   params,
  // }: GetStaticPropsContext) => {
  //   //const { genre } = params!.id

  //   let res = await getMeeYohPlayLists();

  //   // フィルターは？？
  //   return {
  //     props: {
  //       playList: res.items
  //     },
  //     revalidate: 1,
  //   };
  // };
  