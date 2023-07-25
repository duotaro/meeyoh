"use client"
import ENV from '@/utils/env';
import { SET_FIREBASE_AUTH, useFirebaseContext } from '@/context/firebase.context'
import { useEffect, useState } from 'react';
import { SET_FIREBASE_APP, SET_FIREBASE_STORAGE, SET_LOADING } from '@/context/firebase.context';
import { initializeFirebaseApp, firebaseConfig } from '@/lib/firebase';
import { download, downloadList, initFirebaseStorage,} from '@/lib/firestorage';
import { User, getAuth, signInWithEmailAndPassword } from 'firebase/auth';


export default function Storage() {
  const { state, dispatch } = useFirebaseContext()

  const [url, setUrl] = useState<string>("");

  const getStorage = () => {
    // loading
    dispatch({type: SET_LOADING, value: true})
  
    // 環境変数で定義
    const adminEmailAddress = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ADDRESS || ''
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''

    let config = firebaseConfig
    if(!firebaseConfig || !firebaseConfig.storageBucket){
        config = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
          }; 
    }

    const firebase = state.firebase || initializeFirebaseApp(firebaseConfig)
    dispatch({type: SET_FIREBASE_APP, value: firebase})
    const auth = state.firebaseAuth || getAuth(firebase);
    dispatch({type: SET_FIREBASE_AUTH, value: auth})
    const firebaseStorage = initFirebaseStorage()
    dispatch({type: SET_FIREBASE_STORAGE, value: firebaseStorage})

    // adminでログインしちゃう
    signInWithEmailAndPassword(auth, adminEmailAddress, adminPassword).then((res) => {
        let resUser:User = res.user;
        if(!resUser){
            dispatch({type: SET_LOADING, value: false})

            return
        }
    
        download(firebaseStorage, "profile_images/test1.png").then((result) => {
          dispatch({type: SET_LOADING, value: false})
          setUrl(result!)
        }).catch((error) => {
          dispatch({type: SET_LOADING, value: false})
          console.log(error)
        
        });

        downloadList(firebaseStorage, "profile_images").then((result) => {
            dispatch({type: SET_LOADING, value: false})
            //setUrl(result!)
          }).catch((error) => {
            dispatch({type: SET_LOADING, value: false})
            console.log(error)
          
          });

          downloadList(firebaseStorage, "videos").then((result) => {
            dispatch({type: SET_LOADING, value: false})
            //console.log(result)
            //setUrl(result!)
          }).catch((error) => {
            dispatch({type: SET_LOADING, value: false})
            console.log(error)
          
          });
    }).catch((error) => {
        dispatch({type: SET_LOADING, value: false})
        console.log(error)
    })
  }

  useEffect(() => {
    getStorage()
  }, [])



  return (
    <>
        <p>storage</p>
        <p>{url}</p>
        <img src={url} />
    </>
  )
}

