import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { calculateRecoveryScore, calculateReadinessScore } from '@/lib/recovery-engine'

export async function GET(req: NextRequest) {
  const userId = 'odinn'
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data: metrics } = await supabase
    .from('daily_metrics')
    .select('*')
    .eq('userId', userId)
    .eq('date', today.toISOString())
    .single()

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  const { data: sessions } = await supabase
    .from('training_sessions')
    .select('trainingLoad')
    .eq('userId', userId)
    .gte('date', yesterday.toISOString())
    .lt('date', today.toISOString())
  
  const trainingLoadYesterday = sessions?.reduce((acc, s) => acc + s.trainingLoad, 0) || 0

  return NextResponse.json({
    metrics: metrics || null,
    trainingLoadYesterday,
  })
}

export async function POST(req: NextRequest) {
  const userId = 'odinn'
  
  await supabase
    .from('profiles')
    .upsert({ userId, name: 'Odinn' }, { onConflict: 'userId' })

  const data = await req.json()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dateStr = today.toISOString()

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  const { data: yesterdaySessions } = await supabase
    .from('training_sessions')
    .select('trainingLoad')
    .eq('userId', userId)
    .gte('date', yesterday.toISOString())
    .lt('date', today.toISOString())

  const trainingLoadYesterday = yesterdaySessions?.reduce((acc, s) => acc + s.trainingLoad, 0) || 0

  const sevenDayAvgLoad = 500
  const thirtyDayAvgLoad = 450
  const sleepConsistency = 85
  const hrvTrend = 'stable'

  const recoveryMetrics = {
    sleepHours: data.sleepHours || 0,
    hrv: data.hrv || 0,
    restingHr: data.restingHr || 0,
    trainingLoadYesterday,
    energyScore: data.energyScore || 5,
  }

  const recoveryScore = calculateRecoveryScore(recoveryMetrics)
  
  const readinessMetrics = {
    ...recoveryMetrics,
    sevenDayAvgLoad,
    thirtyDayAvgLoad,
    sleepConsistency,
    hrvTrend: hrvTrend as 'up' | 'down' | 'stable',
  }
  const readinessScore = calculateReadinessScore(readinessMetrics, recoveryScore)
  
  let status = 'GREEN'
  if (recoveryScore < 50) status = 'RED'
  else if (recoveryScore < 75) status = 'YELLOW'

  const { data: metrics, error } = await supabase
    .from('daily_metrics')
    .upsert({
      userId,
      date: dateStr,
      ...data,
      recoveryScore,
      readinessScore,
      status,
    }, { onConflict: 'userId,date' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(metrics)
}
