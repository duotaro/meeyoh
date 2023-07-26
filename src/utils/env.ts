// youtube data api
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY
const MEE_YOH_PLAYLIST_ID = process.env.NEXT_PUBLIC_MEE_YOH_PLAYLIST_ID || process.env.MEE_YOH_PLAYLIST_ID

// firebase api
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY
const FIREBASE_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN
const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID
const FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET
const FIREBASE_MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID
const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID
const FIREBASE_MEASUREMENT_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.FIREBASE_MEASUREMENT_ID

// supabase
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY

// cloudflare
const CLOUD_FLARE_PUBLIC_URL = process.env.NEXT_PUBLIC_CLOUD_FLARE_PUBLIC_URL || process.env.CLOUD_FLARE_PUBLIC_URL

const ENV = {
    YOUTUBE_API_KEY: YOUTUBE_API_KEY,
    MEE_YOH_PLAYLIST_ID: MEE_YOH_PLAYLIST_ID,
    FIREBASE_API_KEY: FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: FIREBASE_MEASUREMENT_ID,
    SUPABASE_KEY: SUPABASE_KEY,
    CLOUD_FLARE_PUBLIC_URL: CLOUD_FLARE_PUBLIC_URL
}

export default ENV