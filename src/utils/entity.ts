import { 
    PNG, MP4, MEE_NAME, YOH_NAME,
    CATEGORY_MEE,CATEGORY_OTHER,CATEGORY_YOH,CATEGORY_IMAGE,CATEGORY_VIDEO, YOUTUBE
} from "@/utils/const"


export class MeeYohFile {
    path: string = ''
    type: string = ''
    category: string[] = []
    title: string = ''
    id: number = 0


    constructor(path: string);
    constructor(path: string, category:string[]);
    constructor(path: string, category:string[], title:string);
    constructor(path: string, category:string[], type:string);
    constructor(path: string, category:string[], title:string, type:string)

    constructor(path: string, category?:string[], title?:string, type?:string) {
      this.path = path;
      // type
      if(type){
        this.type = type
        if(type == YOUTUBE){
            category?.push(CATEGORY_VIDEO)
        } 
      } else {
        if(path.indexOf(`.png`) > -1){
            this.type = PNG
            category?.push(CATEGORY_IMAGE)
        } else if(path.indexOf(`.mp4`) > -1 ){
            this.type = MP4
            category?.push(CATEGORY_VIDEO)
        }else {
            this.type = ''
            category?.push(CATEGORY_OTHER)
        }
      }

      if(path.indexOf(MEE_NAME) > -1){
          category?.push(CATEGORY_MEE)
      } else if(path.indexOf(YOH_NAME) > -1){
          category?.push(CATEGORY_YOH)
      }
      
      this.title = title || ''
      this.category = category || []
    }

}

