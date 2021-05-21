import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://aggexhzpbwvmliwygdhg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTUxMDU3OSwiZXhwIjoxOTM3MDg2NTc5fQ.38BtYNmbFOEMuRJvxwJtvsZieYI0O3sF3KOCkQ7LwS8', // this is the public api key
)
