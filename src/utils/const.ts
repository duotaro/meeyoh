import ENV from "./env"

export const MEE_NAME = ENV.MEE_NAME_ENG_SHORT || ''
export const YOH_NAME = ENV.YOH_NAME_ENG_SHORT || ''

export const PNG:string = "image/png"
export const MP4:string = 'video/mp4'

export const FILE_TYPE:string[] = [
    PNG,MP4
]

export const CATEGORY_ALL:string = 'All'
export const CATEGORY_MEE:string = MEE_NAME
export const CATEGORY_YOH:string = YOH_NAME
export const CATEGORY_OTHER:string = 'Other'
export const CATEGORY_IMAGE:string = 'Image'
export const CATEGORY_VIDEO:string = 'Video'
export const FILE_CATEGORY:string[] = [
    CATEGORY_ALL,
    CATEGORY_MEE,
    CATEGORY_YOH,
    CATEGORY_OTHER,
    CATEGORY_IMAGE,
    CATEGORY_VIDEO
]