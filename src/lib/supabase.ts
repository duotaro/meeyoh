// doc
// https://supabase.com/docs/reference/javascript/initializing

import { createClient } from '@supabase/supabase-js'
import ENV from '@/utils/env'

const supabaseUrl = 'https://dvgxkurfzrsbulkqyryb.supabase.co'
const supabaseKey = ENV.SUPABASE_KEY
// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey!)


// Use a custom domain as the supabase URL
//const supabase = createClient('https://my-custom-domain.com', 'public-anon-key')