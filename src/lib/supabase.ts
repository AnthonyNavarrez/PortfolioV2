import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(url, key)

export interface BlobRow {
  id: number
  text: string
  name: string | null
  color: string
  x_pct: number
  y_pct: number
  created_at: string
  session_id: string | null
}
