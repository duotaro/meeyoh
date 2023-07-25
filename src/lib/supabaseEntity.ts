export const baseBucketName:string = "duotaro"

export class SupabaseSearchParam {
    bucketName:string = baseBucketName
    targetFolder:string = "images"
    page:number = 1
    pageSize:number = 20
    sort:SupabaseSearchSortParam = {column:SUPABASE_SORT.UPDATED, order:'desc'}
    search?:string 
    getDetail?:boolean
}

export class SupabaseSearchSortParam {
    column:string = SUPABASE_SORT.UPDATED
    order:string = "desc"
}

export const SUPABASE_SORT = {
    UPDATED:'updated_at',
    CREATED:'created_at',
    LATEST_ACCESSED:'last_accessed_at'
}

export class SupabaseSearchOption {
    limit:number = 20
    offset:number = 0
    sortBy?:SupabaseSearchSortParam
    search?:string 
}


export class SupabaseFileObject{
  name: string = ''
  id:string =  ''
  updated_at?:Date | null = null
  created_at?:Date | null = null
  last_accessed_at?:Date | null = null
  metadata?: SupabaseFileObjectMetadata = {
    eTag: '',
    size: 0,
    mimetype: '',
    cacheControl: '',
    lastModified: '',
    contentLength: '',
    httpStatusCode: ''
  }
  public_url?:string
}

export class SupabaseFileObjectMetadata {
    eTag: string = ''
    size: number = 0
    mimetype: string = ''
    cacheControl: string = ''
    lastModified: string = ''
    contentLength: string = ''
    httpStatusCode: string = ''
}

export const convertFileObject = (fileObject:any):SupabaseFileObject => {
    let item:SupabaseFileObject = new SupabaseFileObject()
    item.name = fileObject.name
    item.id = fileObject.id
    item.updated_at = fileObject.updated_at
    item.created_at = fileObject.created_at
    item.last_accessed_at = fileObject.last_accessed_at
    item.metadata = fileObject.metadata
    item.public_url = fileObject.public_url

    return item
}

