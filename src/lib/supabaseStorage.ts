import { supabase } from "./supabase"
import Utils from "@/utils/utils"

const baseBucketName:string = "duotaro"

/**
 * 新規bucket作成
 */
const createBucket = async (bucketName:string = 'NoName') => {
    let opt = {
      public: false,
      allowedMimeTypes: ['image/png', 'video/mp4'],
      fileSizeLimit: 1024
    }

    const { data, error } 
        = await supabase.storage
                .createBucket(bucketName, opt)

    if(error && !data){
        Utils.errorMessage(error.message)
        return null
    } else {
        return data
    }
    
}



export class SupabaseSearchParam {
    bucketName:string = baseBucketName
    targetFolder:string = "images"
    page:number = 1
    pageSize:number = 20
    sort:SupabaseSearchSortParam = {column:'modified_at', order:'desc'}
    search?:string 
}

export class SupabaseSearchSortParam {
    column:string = 'modified_at'
    order:string = "desc"
}

class SupabaseSearchOption {
    limit:number = 20
    offset:number = 0
    sortBy?:SupabaseSearchSortParam
    search?:string 
}


export const list = async (param:SupabaseSearchParam) => {
    if(!param.bucketName || !param.targetFolder){
        return null
    }
    let offset
    if(!param.page){
        offset = 0
    } else {
        offset = param.page -1
    }
    if(!param.pageSize){
        param.pageSize = 20
    }

    let opt:SupabaseSearchOption = {
        limit: param.pageSize,
        offset: offset,
        sortBy: param.sort
    }
    if(param.search){
        opt.search = param.search
    }




    const { data, error } = await supabase
        .storage
        .from(param.bucketName)
        .list(param.targetFolder, opt)

    if(error && !data){
        Utils.errorMessage(error.message)
        return null
    } else {
        return data
    }

}