import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ldzwbabgpypddrdlcffu.supabase.co"

const supabaseKey = "sb_publishable_4ahqAwtRmGPjiREuSCjXLw_SM8OTZGL"

export const supabase = createClient(supabaseUrl, supabaseKey)