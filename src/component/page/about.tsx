"use client"
import { SET_CATEGORY, useFirebaseContext } from '@/context/firebase.context'
import { CATEGORY_MEE, CATEGORY_YOH, MEE_NAME, YOH_NAME } from '@/utils/const';
import { getProfile } from "@/utils/profile"
import Link from "next/link";

export default function About({name}:{
  name:string
}) {

    const { dispatch } = useFirebaseContext()
    // profileObj取得
    const profile = getProfile(name)

    const imageStyle = {
      "background": `url(${profile.iconImg}) center center no-repeat;`,
      "background-size": "cover;"
    }

    const setCategory = () => {
      if(name == MEE_NAME){
        dispatch({type: SET_CATEGORY, value: CATEGORY_MEE})
      } else if (name == YOH_NAME){
        dispatch({type: SET_CATEGORY, value: CATEGORY_YOH})
      }
    }

    return (
      <section id={`about-${name}`} className={`about p-md-5 p-1 `} >
        <div className="container bg-image p-0 " style={{"margin":"0 auto"}}>
          {/* <span className={`mask  ${profile.overlayColor}`} style={{opacity:'0.1'}}></span> */}
          <div className={`row no-gutters w-100 m-0`}>
            {/* <span className={`mask opacity-25 ${profile.overlayColor}`} style={{opacity:'0.1'}}></span> */}
            <div className="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-lg-start" style={imageStyle}>
            </div>
            <div className="col-xl-7 ps-lg-5 pe-lg-1 d-flex align-items-stretch">
              <div className="content d-flex flex-column justify-content-center">
                <h3><Link href={`/detail/${name}/`}>{profile.name_english}</Link></h3>
                <p>
                {profile.profession} / {profile.role}
                </p>
                <div className="row">
                  <div className="col-md-6 d-md-flex align-items-md-stretch">
                    <div className="count-box">
                      <i className="bi bi-emoji-smile"></i>
                      <span data-purecounter-start="0" data-purecounter-end={profile.age} data-purecounter-duration="1" className="purecounter"></span>
                      <p><strong>{profile.latestBirthday}</strong> に{profile.age}歳になりました。</p>
                    </div>
                  </div>
  
                  <div className="col-md-6 d-md-flex align-items-md-stretch">
                    <div className="count-box">
                      <i className="bi bi-journal-richtext"></i>
                      <span data-purecounter-start="0" data-purecounter-end={profile.lifeDays} data-purecounter-duration="1" className="purecounter"></span>
                      <p>生まれてから<strong>{profile.lifeDays}</strong>日が経ちました</p>
                    </div>
                  </div>
  
                  <div className="col-md-6 d-md-flex align-items-md-stretch">
                    <div className="count-box">
                      <i className="bi bi-clock"></i>
                      <span data-purecounter-start="0" data-purecounter-end={profile.daysNextBirthday} data-purecounter-duration="1" className="purecounter"></span>
                      <p>次の誕生日は<strong>{profile.nextBirthday}</strong>で、あと{profile.daysNextBirthday}日間あります。</p>
                    </div>
                  </div>
  
                  <div className="col-md-6 d-md-flex align-items-md-stretch">
                    <div className="count-box">
                      <a href={`#portfolio`} onClick={setCategory}>
                        <i className="bi bi-camera"></i>
                        {/* <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter"></span> */}
                        <p><strong>写真・動画</strong>を見る</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
)}