import ENV from "@/utils/env"
import { PNG, MP4 } from "@/utils/const"

export class CloudFlareFile {
    path: string = ''
    type: string = ''



  constructor(path: string) {
    this.path = path;
    if(path.indexOf(`.png`) > -1){
        this.type = PNG
    } else if(path.indexOf(`.mp4`) > -1){
        this.type = MP4
    } else {
        this.type = ''
    }
  }
}

export const fileNameList:string[] = [
    "video-99970fd8d3bc95c64c437e243e195c71.mp4",
    "screen.png"
]

export const fileList:CloudFlareFile[] = fileNameList.map((fileName) => {
    return new CloudFlareFile(`${ENV.CLOUD_FLARE_PUBLIC_URL}${fileName}`)
})


