'use client'
import styles from '@/component/page/modal.module.css'
import { YoutubeOption } from "@/component/page/youtube";
import YoutubeItem from "@/component/page/youtube";
import { MeeYohFile } from '@/utils/entity'
import { MP4, PNG } from '@/utils/const'
export default function ContentModal({id, videoId, portfolio}:{
    id:string
    videoId?:string
    portfolio?:MeeYohFile
}) {
    let option:YoutubeOption = new YoutubeOption()
    if (typeof window === 'object') {

        // 画面上部に戻るボタンの制御
        const backToTopBtn = document.querySelector(".back-to-top")
        const myModalEl = document.getElementById(id)
        if(myModalEl){
            myModalEl.addEventListener('shown.bs.modal', event => {
                if(backToTopBtn){
                    backToTopBtn.classList.remove('active')
                }
            })

            myModalEl.addEventListener('hidden.bs.modal', event => {
                if(backToTopBtn && window.scrollY > 100){
                    backToTopBtn.classList.add('active')
                }
            })
        }
    }

    let contentStyle = {
        "maxWidth":"100%",
        "height":"90vh"
    }

    return (
        <div className="modal fade p-0" id={id} >
            <div className="modal-dialog modal-fullscreen" >
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{/*Modal title*/}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body align-items-center">
                    {/* Youtube */}
                    {videoId &&
                        <YoutubeItem videoId={videoId} option={option} />
                    }
                    {/* 画像 */}
                    {portfolio && portfolio.type == PNG &&
                        <div className={styles.modalItem}>
                            <img src={portfolio.path} alt={portfolio.title} className={`${styles.content} object-fit-cover`} style={contentStyle}/>
                        </div>
                    }
                    {/* Youtube以外の動画 */}
                    {portfolio && portfolio.type == MP4 &&
                        <div className={styles.modalItem}>
                            <video controls src={portfolio.path} className={`${styles.content} object-fit-cover`} style={contentStyle}/>
                        </div>
                    }
                </div>
                {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div> */}
                </div>
            </div>
        </div>
)}