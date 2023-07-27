
import { MeeYohFile } from '@/utils/entity'
import Image from 'next/image'

export default function PortfolioItem({portfolio}:{
    portfolio:MeeYohFile
}) {

    return (  
        <div className="col-lg-4 col-md-6 portfolio-item filter-app" key={portfolio.path}>
            <div className="portfolio-wrap">
            <img src="/portfolio/portfolio-1.jpg" className="img-fluid" alt="" />
            <div className="portfolio-info">
                <h4>App 1</h4>
                <p>App</p>
            </div>
            <div className="portfolio-links">
                <a href="/portfolio/portfolio-1.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="App 1"><i className="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
            </div>
            </div>
        </div>
    )
}  