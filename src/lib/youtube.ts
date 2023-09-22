import ENV from '@/utils/env'

/**
 * youtubeは非公開でも音楽が著作権に引っかかると音声なしになってしまうっぽいのでダメかな
 * 音楽なしとか、自作とかフリーを使うとかでならアリかも
 */

/**
 * youtube data api base URL
 */
const baseApiUrl = 'https://www.googleapis.com/youtube/v3/'

/**
 * apiキー
 */
export const apiKey = ENV.YOUTUBE_API_KEY

export type PageInfo = { 
    totalResults: Number,
    resultsPerPage: Number
}

export type Thumbnails = {
    url: string,
    width: Number,
    height: Number
}

/*************************************************************************
 *  プレイリスト一覧取得
 *************************************************************************/

export type PlayListResponse = {
    kind: string,
    etag: string,
    pageInfo: PageInfo,
    items: PlayLists
}
export type PlayList = { 
    kind: string,
    etag: string,
    id: string
};
export type PlayLists = PlayList[]


export const getPlayListUrl = (idList:string[]) => {
    const ids = idList.join(',');

    return `${baseApiUrl}playlists?id=${ids}&key=${apiKey}`
}

export const getPlayList = async (idList:string[]) => {
    const apiUrl = getPlayListUrl(idList)
    const res:Response = await fetch(apiUrl)
    const json = await res.json()
    return json
}

export const MEE_YOH_PLAYLIST_ID:string = ENV.MEE_YOH_PLAYLIST_ID ? ENV.MEE_YOH_PLAYLIST_ID : ''

export const getMeeYohPlayList = async () => {
    return getPlayList([MEE_YOH_PLAYLIST_ID])
}

/*************************************************************************
 *  プレイリストアイテム一覧取得
 *************************************************************************/

export type PlayListItemsResponse = {
    kind: string,
    etag: string,
    nextPageToken: string,
    prevPageToken: string,
    pageInfo: PageInfo,
    items: PlayListItems
}

export type PlayListItems = PlayListItem[]

export type PlayListItem = {
    kind: string,
    etag: string,
    id: string,
    snippet: {
      publishedAt: Date,
      channelId: string,
      title: string,
      description: string,
      thumbnails: { 
        default: Thumbnails,
        medium: Thumbnails,
        high: Thumbnails,
        standard: Thumbnails,
        maxres: Thumbnails 
      },
      channelTitle: string,
      playlistId: string,
      position: Number,
      resourceId: {
        kind: string,
        videoId: string,
      }
    },
    contentDetails: {
      videoId: string,
      startAt: string,
      endAt: string,
      note: string
    },
    status: {
      privacyStatus: string
    }
}



export const getPlayListItemsUrl = (playlistId:string, id?:string) => {
    let url =`${baseApiUrl}playlistItems?playlistId=${playlistId}&key=${apiKey}&part=id,snippet,contentDetails,status`
    if(id){
        url += `&id=${id}`
    }
    return url
}

export const getPlayListItems = async (playlistId:string, id?:string) => {
    const apiUrl = getPlayListItemsUrl(playlistId, id)
    const res:Response = await fetch(apiUrl)
    const json = await res.json()
    return json
}

export const getMeeYohPlayListItems = async () => {
    return getPlayListItems(MEE_YOH_PLAYLIST_ID)
}

export const getMeeYohDetail = async (videoId:string) => {
    return getPlayListItems(MEE_YOH_PLAYLIST_ID, videoId)
}

