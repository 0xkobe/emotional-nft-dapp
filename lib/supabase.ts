import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
if (!supabaseUrl) throw new Error('env NEXT_PUBLIC_SUPABASE_URL is not set')

const supabaseKey =
  process.env.NEXT_ADMIN_SUPABASE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_KEY
if (!supabaseKey)
  throw new Error(
    'one of env NEXT_ADMIN_SUPABASE_KEY and NEXT_PUBLIC_SUPABASE_KEY must be set',
  )

export const supabase = createClient(supabaseUrl, supabaseKey)
