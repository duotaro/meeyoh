'use client'
import Youtube from 'react-youtube'

export default function YoutubeItem({videoId}:{
    videoId:string
}) {
    if(!videoId){
        return 
    }

    return (
        <Youtube videoId={videoId} 
            className="youtube" iframeClassName="iframe"/>
)}