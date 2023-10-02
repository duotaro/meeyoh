'use client'
import Youtube, { YouTubeProps } from 'react-youtube'
import { useState } from 'react'
import styles from '@/component/page/modal.module.css'

export class YoutubeOptionDetail {
    /** 最初の動画を自動再生するかどうか */
    autoplay:number = 0
    controls:number = 1
    /** このパラメータの値を 1 に設定すると、プレーヤーはキーボード操作に応答しなくなります */
    disablekb:number = 1
    /** このパラメータの値を 1 に設定すると、IFrame または JavaScript Player API を呼び出してプレーヤーを制御できます。 */
    enablejsapi:number = 1
    // width:string = '640'
    // height:string = '360'

    constructor()
    constructor(obj:Object)

    constructor(obj?:Object){
        if(!obj){
            this.autoplay = 0
            this.controls = 1
            this.disablekb = 1
            this.enablejsapi = 1
            // this.width = '640'
            // this.height = '360'
        }
    }
}

export class YoutubeOption {
    /** 最初の動画を自動再生するかどうか */
    playerVars:YoutubeOptionDetail = new YoutubeOptionDetail()

    constructor()
    constructor(detailOption:YoutubeOptionDetail)

    constructor(detailOption?:YoutubeOptionDetail){
        this.playerVars = detailOption ?? new YoutubeOptionDetail()
    }

}

export default function YoutubeItem({videoId, option}:{
    videoId:string,
    option:YoutubeOption
}) {
    if(!videoId){
        return 
    }
    if(!option){
        option = new YoutubeOption(new YoutubeOptionDetail())
    }

    // 音源、youtubeにしようとしたけど難しそう
    var audioUrl = "/music/Morning.mp3"
    // 音源リストここで選択肢を設ける？

    const [playing, setPlaying] = useState<boolean>(false);

    const id = `audio_${videoId}`

    var playingMusic = (e:any) => {}
    var stopMusic = (e:any) => {}

    if (typeof window === 'object') {
        const audio:HTMLMediaElement = document.getElementById(id) as HTMLMediaElement
        if(!audio){
            return
        }
        audio.volume = 0.25

        playingMusic = (e:any) => {
            setPlaying(true)
            audio?.play()
        }

        stopMusic = (e:any) => {
            setPlaying(false)
            audio?.pause()
        }

    }

    return (
        <>
            {/* youtube */}
            <Youtube videoId={videoId} opts={option} id={videoId}
                className={`${styles.modal} text-center align-middle`} iframeClassName={styles.iframe}
                onPlay={playingMusic} onPause={stopMusic} onEnd={stopMusic} />
            {/* music */}    
            <video src={audioUrl} id={id} style={{"display":"none"}}/>
        </>
)}