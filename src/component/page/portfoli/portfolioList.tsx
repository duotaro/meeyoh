'use client'
import { FILE_CATEGORY, CATEGORY_ALL } from '@/utils/const'
import { useState } from 'react'
import PortfolioItem from './portfolioItem';
import { MeeYohFile } from '@/utils/entity';
import { fileList } from '@/lib/cloudflare'

export default function PortfolioList({list}:{
  list:MeeYohFile[]
}) {
    const [portfolioList, setPortfolioList] = useState<MeeYohFile[]>(list);
    const [videoList, setVideoList] = useState<MeeYohFile[]>(fileList);
    const [activeCategory, setActiveCategory] = useState<string>(CATEGORY_ALL);


    const clickHandlerCategory = (e:React.MouseEvent<HTMLButtonElement>, category:string) => {
        e.preventDefault()

        alert("clickHandlerCategory.category => "  +  category)

        // リストフィルター
        if(FILE_CATEGORY.indexOf(category) < 0 || CATEGORY_ALL == category){
          alert("nothing/"  +  category)
          setPortfolioList(list)
          setVideoList(fileList)
          setActiveCategory(CATEGORY_ALL)
          return
        }

        setActiveCategory(category)

        let resultPortfolioList:MeeYohFile[] = []
        list.map((portfolio) => {
          console.log(portfolio.category)
          if(portfolio.category.indexOf(category) > -1){
            resultPortfolioList.push(portfolio)
          }
        })
        console.log(resultPortfolioList)
        setPortfolioList(resultPortfolioList)

        let resultVideoList:MeeYohFile[] = []
        fileList.map((video) => {
          console.log(video.category)
          if(video.category.indexOf(category) > -1){
            resultVideoList.push(video)
          }
        })
        console.log(resultVideoList)
        setVideoList(resultVideoList)
    }

    const matchCategory = (category:string) => {
        if(category == activeCategory){
            return true
        }
        return false
    }

    return (
      <>
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              {FILE_CATEGORY.map((category)=>{
                return (
                  <li className={matchCategory(category) ? 'filter-active btn-group' : 'btn-group'} key={category}>
                    <button className="btn btn-dark" onClick={(e) => clickHandlerCategory(e, category)} disabled={matchCategory(category)}>{category}</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="row portfolio-container">
          {portfolioList.map((portfolio:MeeYohFile)=>{
            return (
              <PortfolioItem portfolio={portfolio} key={portfolio.path}/>
            )
          })}
          

          <div className="col-lg-4 col-md-6 portfolio-item filter-web">
            <div className="portfolio-wrap">
              <img src="/portfolio/portfolio-2.jpg" className="img-fluid" alt=""/>
              <div className="portfolio-info">
                <h4>Web 3</h4>
                <p>Web</p>
              </div>
              <div className="portfolio-links">
                <a href="/portfolio/portfolio-2.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="Web 3"><i className="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 portfolio-item filter-app">
            <div className="portfolio-wrap">
              <img src="/portfolio/portfolio-3.jpg" className="img-fluid" alt=""/>
              <div className="portfolio-info">
                <h4>App 2</h4>
                <p>App</p>
              </div>
              <div className="portfolio-links">
                <a href="/portfolio/portfolio-3.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="App 2"><i className="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 portfolio-item filter-card">
            <div className="portfolio-wrap">
              <img src="/portfolio/portfolio-4.jpg" className="img-fluid" alt=""/>
              <div className="portfolio-info">
                <h4>Card 2</h4>
                <p>Card</p>
              </div>
              <div className="portfolio-links">
                <a href="/portfolio/portfolio-4.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="Card 2"><i className="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 portfolio-item filter-web">
            <div className="portfolio-wrap">
              <img src="/portfolio/portfolio-5.jpg" className="img-fluid" alt=""/>
              <div className="portfolio-info">
                <h4>Web 2</h4>
                <p>Web</p>
              </div>
              <div className="portfolio-links">
                <a href="/portfolio/portfolio-5.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="Web 2"><i className="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 portfolio-item filter-app">
            <div className="portfolio-wrap">
              <img src="/portfolio/portfolio-6.jpg" className="img-fluid" alt=""/>
              <div className="portfolio-info">
                <h4>App 3</h4>
                <p>App</p>
              </div>
              <div className="portfolio-links">
                <a href="/portfolio/portfolio-6.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="App 3"><i className="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 portfolio-item filter-card">
            <div className="portfolio-wrap">
              <img src="/portfolio/portfolio-7.jpg" className="img-fluid" alt=""/>
              <div className="portfolio-info">
                <h4>Card 1</h4>
                <p>Card</p>
              </div>
              <div className="portfolio-links">
                <a href="/portfolio/portfolio-7.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="Card 1"><i className="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 portfolio-item filter-card">
            <div className="portfolio-wrap">
              <img src="/portfolio/portfolio-8.jpg" className="img-fluid" alt=""/>
              <div className="portfolio-info">
                <h4>Card 3</h4>
                <p>Card</p>
              </div>
              <div className="portfolio-links">
                <a href="/portfolio/portfolio-8.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="Card 3"><i className="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 portfolio-item filter-web">
            <div className="portfolio-wrap">
              <img src="/portfolio/portfolio-9.jpg" className="img-fluid" alt=""/>
              <div className="portfolio-info">
                <h4>Web 3</h4>
                <p>Web</p>
              </div>
              <div className="portfolio-links">
                <a href="/portfolio/portfolio-9.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="Web 3"><i className="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
              </div>
            </div>
          </div>

           {/* ここから映像  */}
          {videoList.map((video:MeeYohFile)=>{
            return (
              <PortfolioItem portfolio={video} key={video.path}/>
            )
          })}
        </div>
      </>
)}