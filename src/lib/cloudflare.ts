import ENV from "@/utils/env"
import { 
    PNG, MP4, 
    CATEGORY_MISAKI,CATEGORY_OTHER,CATEGORY_YOTA 
} from "@/utils/const"

export class CloudFlareFile {
  path: string = ''
  type?: string = ''
  category?: string[] = ['other']

  constructor(path: string, category?:string[]) {
    this.path = path;
    if(path.indexOf(`.png`) > -1){
        this.type = PNG
    } else if(path.indexOf(`.mp4`) > -1){
        this.type = MP4
    } else {
        this.type = ''
    }
    this.category = category
  }
}

/**
 * ファイル名を定義します
 */
export const fileNameList:CloudFlareFile[] = [
    {path:"video-99970fd8d3bc95c64c437e243e195c71.mp4", type:'', category:[CATEGORY_MISAKI]},
    {path:"screen.png", type:'',category:[CATEGORY_YOTA]}
]

/**
 * ファイル名から描画に必要な属性を判定します
 */
export const fileList:CloudFlareFile[] = fileNameList.map((file:CloudFlareFile) => {
    return new CloudFlareFile(`${ENV.CLOUD_FLARE_PUBLIC_URL}${file.path}`, file.category)
})


