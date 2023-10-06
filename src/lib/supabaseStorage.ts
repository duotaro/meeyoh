import { supabase } from "./supabase"
import Utils from "@/utils/utils"
import { SupabaseSearchParam, SupabaseSearchOption, convertFileObject, SupabaseFileObject, convertFileObjectFromSupabase } from "./supabaseEntity"
import { PNG, MP4 } from "@/utils/const"
import { MeeYohFile } from "@/utils/entity"
/**
 * 新規bucket作成
 */
const createBucket = async (bucketName:string = 'NoName') => {
    let opt = {
      public: false,
      allowedMimeTypes: [PNG, MP4],
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

export const getSpabaseList = async (param:SupabaseSearchParam) => {
    if(!param.bucketName || !param.targetFolder){
        return []
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


    const list = await supabase
    .storage
    .from(param.bucketName)
    .list(param.targetFolder, opt)

    const { data, error } = await supabase
        .storage
        .from(param.bucketName)
        .list(param.targetFolder, opt)

        


    if(error && !data){
        Utils.errorMessage(error.message)
        return null
    } else {

        let res:SupabaseFileObject[] = []

        for (let item of data) {
            let obj:SupabaseFileObject = convertFileObject(item)
            res.push(obj)
        }

        if(param.getDetail){
            for await (let item of res) {
                const { publicUrl } = await findPublicUrl(param.bucketName, param.targetFolder, item.name)
                item.public_url = publicUrl
            }
        }


        const fileList:MeeYohFile[] = res.map((file:SupabaseFileObject)=>{
            return convertFileObjectFromSupabase(file)
        })
        return fileList
    }
}


export const findPublicUrl = async (backetName:string, filePath:string, fileName:string) => {
    const { data } = await supabase
        .storage
        .from(backetName)
        .getPublicUrl(`${filePath}/${fileName}`)

    return data
}