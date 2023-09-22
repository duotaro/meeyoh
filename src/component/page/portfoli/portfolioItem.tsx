
import { MeeYohFile } from '@/utils/entity'
import Image from 'next/image'
import { MP4, PNG } from '@/utils/const'

export default function PortfolioItem({portfolio}:{
    portfolio:MeeYohFile
}) {

    return (  
        <>
        <div className="col-lg-4 col-md-6 portfolio-item filter-app" key={portfolio.path}>
            <div className="portfolio-wrap">
                {portfolio.type == PNG &&
                    <img src={portfolio.path} className="img-fluid object-fit-cover" alt={portfolio.title}/>
                }          
                {portfolio.type == MP4 &&
                    <video controls src={portfolio.path} className="img-fluid object-fit-cover"></video>

                }          
                <div className="portfolio-info">
                    <h4>{portfolio.title}</h4>
                    <p>any description</p>
                </div>
                <div className="portfolio-links">
                    <a href={portfolio.path} data-gallery="portfolioGallery" className="portfolio-lightbox" title={portfolio.title}><i className="bx bx-plus"></i></a>
                    <a href={portfolio.path} title="More Details"><i className="bx bx-link"></i></a>
                </div>
            </div>
        </div>
        {/* typeでmodalを分ける/ 写真用のmodalも作る？もしくは映像の場合だけにして、映像の場合は尺英ボタンを押す？？ */}
        {/* <MovieModal videoId={videoId} /> */}

        </>
    )
}  