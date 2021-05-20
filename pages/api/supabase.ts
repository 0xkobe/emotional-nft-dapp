import { createClient } from '@supabase/supabase-js'

// TODO: use public key not this private
export const supabase = createClient(
  'https://aggexhzpbwvmliwygdhg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjIxNTEwNTc5LCJleHAiOjE5MzcwODY1Nzl9.tCx-nUYWk6Mx_2auJ4miYjAbiTt931XG6MbbdOvTCTg',
)
