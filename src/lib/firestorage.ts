import { FirebaseStorage, StorageReference, getStorage, ref, getDownloadURL, listAll, ListResult, list } from "firebase/storage";
import { initializeFirebaseApp, firebaseConfig } from "./firebase";
import Utils from "@/utils/utils";

export const baseUrl = "https://firebasestorage.googleapis.com/v0/b/"

export const videoRootPath = "videos"
export const prodileRootPath = "profile_images"
export const imageRootPath = "images"





// Initialize Cloud Storage and get a reference to the service
export const initFirebaseStorage = ():FirebaseStorage => {
    const app = initializeFirebaseApp(firebaseConfig);
    const storage:FirebaseStorage = getStorage(app);
    return storage
}

/**
 * 参照の作成
 * pathを指定しない場合はバケットのルートをポイントします。
 * @param path 
 * @returns 
 */
export const getReference = (storage:FirebaseStorage, path:string):StorageReference => {
    if(!storage){
        storage = initFirebaseStorage()
    }

    const storageRef = path ? ref(storage, path) : ref(storage);
    return storageRef
}


export class FirebaseStorageResult {
    storage:FirebaseStorage | null = null
    rootPath:string = ""
    pageSize?:number
    result:ListResult | null = null
}

/**
 * 個別ダウンロード
 * @param storage 
 * @param path 
 * @returns 
 */
export const download = async (storage:FirebaseStorage, path:string) => {
    if(!path){
        return
    }

    if(!storage){
        storage = initFirebaseStorage()
    }
    try {
        const res = await getDownloadURL(getReference(storage, path))
        return res
    } catch(error:any){
        Utils.errorMessage(error)
    };
}


/**
 * 個別ダウンロード
 * @param storage 
 * @param path 
 * @returns 
 */
export const downloadList = async (storage:FirebaseStorage, rootPath:string, pageSize?:number) => {
    if(!rootPath){
        return
    }

    if(!storage){
        storage = initFirebaseStorage()
    }
    try {
        const res:ListResult = pageSize ? await list(getReference(storage, rootPath), {}) : await listAll(getReference(storage, rootPath))
        //console.log(res)
        // res.items.forEach((itemRef:StorageReference) => {
        //     console.log(itemRef.toString())
        //     console.log(itemRef.root)
        //     console.log(itemRef.bucket)
        //     console.log(itemRef.fullPath)
        //     console.log(itemRef.name)
        //     console.log(itemRef.storage)
        //     console.log(itemRef.parent)
        // });
        const result:FirebaseStorageResult = {
            storage: storage,
            rootPath: rootPath,
            pageSize: pageSize,
            result: res
        }
        return result
    } catch(error:any){
        Utils.errorMessage(error)
    };
}


export const downloadNextPage = async (result:FirebaseStorageResult) => {

    let resultItem:FirebaseStorageResult = {
        storage: null,
        rootPath: "",
        pageSize: undefined,
        result: null
    }

    const storage = result.storage
    if(storage){
        return resultItem
    }
    const rootPath:string = result.rootPath
    const pageSize = result.pageSize
    const res = result.result
    if (pageSize && res && res.nextPageToken) {
        const next = await list(getReference(storage!, rootPath), {
          maxResults: pageSize,
          pageToken: res.nextPageToken,
        })
        resultItem.storage = storage
        resultItem.rootPath = rootPath
        resultItem.pageSize = pageSize
        resultItem.result = next
        
        return resultItem
    }
    return resultItem
}