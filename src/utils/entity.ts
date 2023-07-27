import { 
    PNG, MP4,
    CATEGORY_MEE,CATEGORY_OTHER,CATEGORY_YOH,CATEGORY_IMAGE,CATEGORY_VIDEO
} from "@/utils/const"


export class MeeYohFile {
    path: string = ''
    type: string = ''
    category: string[] = []
    title: string = ''


    constructor(path: string);
    constructor(path: string, category:string[]);
    constructor(path: string, category:string[], title:string);
    constructor(path: string, category:string[], type:string);


    constructor(path: string, category?:string[], title?:string, type?:string, ) {
      this.path = path;
      // type
      if(type){
        this.type = type
      } else {
        if(path.indexOf(`.png`) > -1){
            this.type = PNG
            category?.push(CATEGORY_IMAGE)
        } else if(path.indexOf(`.mp4`) > -1){
            this.type = MP4
            category?.push(CATEGORY_VIDEO)
        } else {
            this.type = ''
        }
      }
      this.title = title || ''
      this.category = category || []
    }

}

