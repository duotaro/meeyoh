import { getAge, getNextBirthday, getLifeDays } from "@/utils/age"
import { getProfile } from "@/utils/profile"
import Image from "next/image"

export default function About({name}:{
  name:string
}) {

  // profileObj取得
  const profile = getProfile(name)

    return (
      <section id={`about-${name}`} className={`about`} >
        <div className="container bg-image">
          <span className={`mask  ${profile.overlayColor}`} style={{opacity:'0.1'}}></span>
          <div className={`row no-gutters w-100`}>
            {/* <span className={`mask opacity-25 ${profile.overlayColor}`} style={{opacity:'0.1'}}></span> */}
            <div className="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-lg-start">
              <img src={profile.iconImg} alt={profile.id} />
            </div>
            <div className="col-xl-7 ps-0 ps-lg-5 pe-lg-1 d-flex align-items-stretch">
              <div className="content d-flex flex-column justify-content-center">
                <h3>{profile.name_english}</h3>
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
                      <i className="bi bi-award"></i>
                      <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter"></span>
                      <p><strong>Awards</strong> rerum asperiores dolor alias quo reprehenderit eum et nemo pad der</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
)}