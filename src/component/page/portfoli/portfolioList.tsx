'use client'
import { FILE_CATEGORY, CATEGORY_ALL, MP4, YOUTUBE, CATEGORY_VIDEO } from '@/utils/const'
import { useState, useEffect } from 'react'
import PortfolioItem from './portfolioItem';
import { MeeYohFile } from '@/utils/entity';
import { fileList } from '@/lib/cloudflare'
import { PlayListItem } from "@/lib/youtube";
import { SET_CATEGORY, useFirebaseContext } from '@/context/firebase.context'



export default function PortfolioList({list, playList}:{
  list:MeeYohFile[]
  playList:PlayListItem[]
}) {

    const { state } = useFirebaseContext()
    
    const youtubeList = playList.map((p) => {
      var portfolio:MeeYohFile = new MeeYohFile(p.snippet.resourceId.videoId, [], p.snippet.thumbnails.medium.url, YOUTUBE)
      return portfolio
    })


    const [portfolioList, setPortfolioList] = useState<MeeYohFile[]>(list);
    const [videoList, setVideoList] = useState<MeeYohFile[]>(fileList);
    const [youtubeItems, setYoutubeItems] = useState<MeeYohFile[]>(youtubeList);
    const [showList, setShowList] = useState<boolean>(true);

    let all =  portfolioList.concat(videoList).concat(youtubeItems);
    all.map((item, index) => {
      item.id = index 
    })

    const [allList, setAllList] = useState<MeeYohFile[]>(all);
    const [activeCategory, setActiveCategory] = useState<string>(state.categoryFilter ?? CATEGORY_ALL);
    

    useEffect(() => {
      setShowList(false)
      filterList(state.categoryFilter)
      setShowList(true)
    }, [state]);


    const clickHandlerCategory = (e:React.MouseEvent<HTMLButtonElement>, category:string) => {
        e.preventDefault()
        filterList(category)
    }

    const filterList = (category:string) => {

        // alert("clickHandlerCategory.category => "  +  category)

        // リストフィルター
        if(FILE_CATEGORY.indexOf(category) < 0 || CATEGORY_ALL == category){
          setPortfolioList(list)
          setVideoList(fileList)
          const youtubeList = playList.map((p) => {
            var portfolio:MeeYohFile = new MeeYohFile(p.snippet.resourceId.videoId, [], p.snippet.thumbnails.medium.url, YOUTUBE)
            return portfolio
          })
          setYoutubeItems(youtubeList)
          setActiveCategory(CATEGORY_ALL)
          let all = concatAll(list, fileList, youtubeList)
          setAllList(all)
          return
        }


        setActiveCategory(category)
        // 写真
        let resultPortfolioList:MeeYohFile[] = []
        list.map((portfolio) => {
          if(portfolio.category.indexOf(category) > -1){
            resultPortfolioList.push(portfolio)
          }
        })
        setPortfolioList(resultPortfolioList)

        // 映像
        let resultVideoList:MeeYohFile[] = []
        fileList.map((video) => {
          if(video.category.indexOf(category) > -1){
            resultVideoList.push(video)
          }
        })
        setVideoList(resultVideoList)


        // youtube
        let resultYoutubeList:PlayListItem[] = []
        playList.map((youtube) => {
          if(category == CATEGORY_VIDEO){
            resultYoutubeList.push(youtube)
          }
        })
        const youtubeList = resultYoutubeList.map((p) => {
          var portfolio:MeeYohFile = new MeeYohFile(p.snippet.resourceId.videoId, [], p.snippet.thumbnails.medium.url, YOUTUBE)
          return portfolio
        })
        setYoutubeItems(youtubeList)

        let all = concatAll(resultPortfolioList, resultVideoList, youtubeList)
        setAllList(all)
    }

    const concatAll = (list1:MeeYohFile[], list2:MeeYohFile[], list3:MeeYohFile[]):MeeYohFile[] => {
      let all =  list1.concat(list2).concat(list3);
      all.map((item, index) => {
        item.id = index 
      })
      return all
    }

    const matchCategory = (category:string) => {
        if(category == state.categoryFilter){
            return true
        }
        return false
    }

    return (
      <>
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters" data-type={state.categoryFilter}>
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
          {showList && allList.map((portfolio:MeeYohFile)=>{
            return (
              <PortfolioItem portfolio={portfolio} key={portfolio.path}/>
            )
          })}
          {!allList.length && 
            <p className='text-center '>該当するアイテムがありません</p>
          }
{/*           

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
          </div> */}

        </div>
      </>
)}