import { 
    PNG, MP4, MEE_NAME, YOH_NAME,
    CATEGORY_MEE,CATEGORY_OTHER,CATEGORY_YOH,CATEGORY_IMAGE,CATEGORY_VIDEO, YOUTUBE
} from "@/utils/const"
import { Profile } from "./profile"


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

export class UserEntity {
    id: number = 0
    name: string = ""
    profile?:Profile 

    constructor(id: number, name:string);
    constructor(id: number, name:string) {
        this.id = id
        this.name = name
    }
}


export class TodoEntity {
    id?: number
    title: string = ""
    description?: string
    user_id: number = 0
    scheduled_at: Date = new Date()
    complete:boolean = false
    completed_at?: Date


    constructor(id: number);
    constructor(id: number, title:string, description:string, user_id:number, scheduled_at:Date);

    constructor(id?: number, title?:string, description?:string, user_id?:number, scheduled_at?:Date) {
      if(id && id > 0){
        this.id = id
      }
      if(title){
        this.title = title
      }
      if(description){
        this.description = description
      }
      if(user_id){
        this.user_id = user_id
      }
      if(scheduled_at){
        this.scheduled_at = scheduled_at
      }
    }

    /**
     * 実績解除
     */
    completed = () => {
        this.complete = true
        this.completed_at = new Date()
    }

    

}

