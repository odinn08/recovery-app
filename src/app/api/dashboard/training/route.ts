import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const userId = 'odinn'
  
  const { data: sessions } = await supabase
    .from('training_sessions')
    .select('*')
    .eq('userId', userId)
    .order('date', { ascending: false })
    .limit(5)

  return NextResponse.json(sessions || [])
}

export async function POST(req: NextRequest) {
  const userId = 'odinn'

  await supabase
    .from('profiles')
    .upsert({ userId, name: 'Odinn' }, { onConflict: 'userId' })

  const data = await req.json()
  const trainingLoad = data.durationMinutes * data.intensity

  const { data: session, error } = await supabase
    .from('training_sessions')
    .insert({
      userId,
      ...data,
      trainingLoad,
      date: new Date(data.date).toISOString(),
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(session)
}
