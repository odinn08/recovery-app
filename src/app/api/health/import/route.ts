import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { calculateRecoveryScore } from '@/lib/scoring/recovery'
import { calculateReadinessScore } from '@/lib/scoring/readiness'

const schema = z.object({
  date: z.string().transform(s => new Date(s)),
  sleep_hours: z.number(), deep_sleep_minutes: z.number(), rem_sleep_minutes: z.number(),
  hrv: z.number(), resting_hr: z.number(), weight: z.number(),
  energy_score: z.number().min(1).max(10), soreness_score: z.number().min(1).max(10),
})

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get('authorization') !== `Bearer ${process.env.FIGHTREADY_API_KEY}`)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const val = schema.parse(await req.json()), userId = "odinn", dStr = val.date.toISOString()
    const d = new Date(val.date), y = new Date(d); y.setDate(d.getDate() - 1)
    const s7 = new Date(d); s7.setDate(d.getDate() - 7)
    const s30 = new Date(d); s30.setDate(d.getDate() - 30)

    const { data: st } = await supabase.from('training_sessions').select('trainingLoad, date')
      .eq('userId', userId).gte('date', s30.toISOString()).lte('date', dStr)

    const getL = (start: Date, end: Date) => st?.filter(x => {
      const ts = new Date(x.date); return ts >= start && ts <= end
    }).reduce((sum, x) => sum + x.trainingLoad, 0) || 0

    const loadY = getL(new Date(y.setHours(0,0,0,0)), new Date(y.setHours(23,59,59,999)))
    const avg7 = getL(s7, d) / 7, avg30 = getL(s30, d) / 30

    const rec = calculateRecoveryScore({
      sleepHours: val.sleep_hours, hrv: val.hrv, restingHr: val.resting_hr,
      trainingLoadYesterday: loadY, energyScore: val.energy_score,
    })
    const readi = calculateReadinessScore({
      recoveryScore: rec.score, sevenDayAvgLoad: avg7, thirtyDayAvgLoad: avg30,
      hrvTrend: 'stable', sleepConsistency: 85,
    })

    const metrics = {
      userId, date: dStr, sleepHours: val.sleep_hours, deepSleepMinutes: val.deep_sleep_minutes,
      remSleepMinutes: val.rem_sleep_minutes, hrv: val.hrv, restingHr: val.resting_hr, weight: val.weight,
      energyScore: val.energy_score, sorenessScore: val.soreness_score,
      recoveryScore: rec.score, readinessScore: readi, status: rec.status,
    }

    await supabase.from('daily_metrics').upsert(metrics, { onConflict: 'userId,date' })

    return NextResponse.json({ success: true, data: { recovery_score: rec.score, readiness_score: readi, status: rec.status } })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: e instanceof z.ZodError ? e.errors : 'Server Error' }, { status: e instanceof z.ZodError ? 400 : 500 })
  }
}
