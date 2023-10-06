import ENV from "@/utils/env"
import { MeeYohFile } from "@/utils/entity"
import { 
    PNG, MP4, MEE_NAME, YOH_NAME, CATEGORY_IMAGE, CATEGORY_VIDEO,
    CATEGORY_MEE,CATEGORY_OTHER,CATEGORY_YOH 
} from "@/utils/const"
/**
 * ファイル名に日本語が可能なので、MEE_NAMEとYOH_NAMEを入れてカテゴリ分け
 * タイトルもファイル名からextensionを削除して使えば良さげ
 */

/**
 * ファイル名とカテゴリを定義します
 */
export const fileNameList:MeeYohFile[] = [
    new MeeYohFile("video-99970fd8d3bc95c64c437e243e195c71.mp4", [CATEGORY_MEE, CATEGORY_VIDEO], MP4, 'title1'),
    new MeeYohFile("screen.png", [CATEGORY_YOH, CATEGORY_IMAGE], PNG, 'title2')
]

/**
 * ファイル名から描画に必要な属性を判定します
 */
export const fileList:MeeYohFile[] = fileNameList.map((file:MeeYohFile) => {
    return new MeeYohFile(`${ENV.CLOUD_FLARE_PUBLIC_URL}${file.path}`, file.category, file.title, file.type)
})


