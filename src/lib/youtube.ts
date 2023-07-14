import ENV from '@/utils/env'

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



export const getPlayListItemsUrl = (id:string) => {
    return `${baseApiUrl}playlistItems?playlistId=${id}&key=${apiKey}&part=id,snippet,contentDetails,status`
}

export const getPlayListItems = async (id:string) => {
    const apiUrl = getPlayListItemsUrl(id)
    const res:Response = await fetch(apiUrl)
    const json = await res.json()
    return json
}

export const getMeeYohPlayListItems = async () => {
    return getPlayListItems(MEE_YOH_PLAYLIST_ID)
}

