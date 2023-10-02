'use client'
import { MeeYohFile } from '@/utils/entity'
import ContentModal from "@/component/page/contentModal";
import { MP4, PNG, YOUTUBE } from '@/utils/const'

export default function PortfolioItem({portfolio}:{
    portfolio:MeeYohFile
}) {

    // 画像の場合は画像リンクに直接飛ぶようにする？かのフラグ
    let imageMoveOtherWindow = true

    let videoId
    let thumbnail
    let modalId = String(portfolio.id)
    if(portfolio.type == PNG){
        modalId = `modal-${portfolio.id}`
    } else if (portfolio.type == MP4){
        modalId = `modal-${portfolio.id}`
    } else if(portfolio.type == YOUTUBE){
        videoId = portfolio.path
        thumbnail = portfolio.title
        modalId = `modal-${videoId}`
    }

    // const openModal = (id) => {
    //    let modal = new bootstrap.Modal('#test-modal');   
    // }

    return (  
        <>
            <div className="col-lg-4 col-md-6 portfolio-item filter-app" key={portfolio.path} >
                {portfolio.type == PNG && imageMoveOtherWindow &&
                    <a href={portfolio.path} target="_blank">
                        <img src={portfolio.path} className="pottofolio-content object-fit-cover image" alt={portfolio.title} />
                    </a>
                }          
                {portfolio.type == PNG && !imageMoveOtherWindow &&
                    <img src={portfolio.path} className="pottofolio-content object-fit-cover image" alt={portfolio.title} data-bs-toggle="modal" data-bs-target={`#${modalId}`}/>
                }          
                {portfolio.type == MP4 &&
                    <video src={portfolio.path} className="pottofolio-content object-fit-cover mp4" data-bs-toggle="modal" data-bs-target={`#${modalId}`}/>
                }
                {portfolio.type == YOUTUBE && 
                    <img src={thumbnail} className="pottofolio-content object-fit-cover youtube" data-bs-toggle="modal" data-bs-target={`#${modalId}`}/>
                }
            </div>
            <ContentModal id={modalId} videoId={videoId} portfolio={portfolio}/>
        </>
    )
}  