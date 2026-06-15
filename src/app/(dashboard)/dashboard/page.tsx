'use client'

import { RecoveryCard } from '@/components/dashboard/recovery-card'
import { ReadinessCard } from '@/components/dashboard/readiness-card'
import { MetricCard } from '@/components/dashboard/metric-card'
import { RecoveryTrend } from '@/components/dashboard/recovery-trend'
import { LogTrainingDialog } from '@/components/dashboard/log-training-dialog'
import { LogMetricsDialog } from '@/components/dashboard/log-metrics-dialog'
import { Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'

export default function DashboardPage() {
  const { data: metricsData, isLoading: metricsLoading } = useQuery({
    queryKey: ['metrics'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/metrics')
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    }
  })

  const { data: trainingData, isLoading: trainingLoading } = useQuery({
    queryKey: ['training'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/training')
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    }
  })

  const metrics = metricsData?.metrics || {}
  const recoveryScore = metrics.recoveryScore || null
  const readinessScore = metrics.readinessScore || null

  const displayMetrics = [
    { 
      title: 'Sleep', 
      value: metrics.sleepHours ? `\${metrics.sleepHours}h` : null, 
      unit: '', 
      icon: 'Moon' as const, 
      color: '#a855f7' 
    },
    { 
      title: 'HRV', 
      value: metrics.hrv || null, 
      unit: 'ms', 
      icon: 'Heart' as const, 
      color: '#ef4444' 
    },
    { 
      title: 'Resting HR', 
      value: metrics.restingHr || null, 
      unit: 'bpm', 
      icon: 'Activity' as const, 
      color: '#3b82f6' 
    },
    { 
      title: 'Weight', 
      value: metrics.weight || null, 
      unit: 'kg', 
      icon: 'Scale' as const, 
      color: '#f59e0b' 
    },
  ]

  const recentWorkouts = trainingData || []
  
  // Calculate today's total load
  const today = new Date().toISOString().split('T')[0]
  const todayLoad = recentWorkouts
    .filter((s: any) => s.date.startsWith(today))
    .reduce((acc: number, s: any) => acc + s.trainingLoad, 0)

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-black tracking-tighter text-white">ATHLETE <span className="text-prestigious">OVERVIEW</span></h2>
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Performance Diagnostics • Today</p>
        </div>
        <div className="flex items-center gap-4">
          <LogMetricsDialog />
          <LogTrainingDialog />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <RecoveryCard score={recoveryScore} />
        <ReadinessCard score={readinessScore} />
        <Card className="border-white/5 bg-[#1A1A28] shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap className="h-40 w-40 text-[#FBB03B]" />
          </div>
          <CardHeader>
            <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Today's Training Load
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2 pb-8 relative">
            <div className="text-8xl font-black text-white tracking-tighter">
              {todayLoad > 0 ? todayLoad : '—'}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs font-black text-zinc-500 uppercase tracking-tighter">OPTIMAL TARGET:</span>
              <span className="text-xs font-black text-[#FBB03B]">400 - 800</span>
            </div>
            
            <div className="mt-12 w-full space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Load Accumulation</span>
                <span className="text-xs font-black text-white">{Math.min(Math.round((todayLoad / 800) * 100), 100)}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-zinc-800/50 p-0.5 border border-white/5">
                <div 
                  className="h-full rounded-full bg-prestigious shadow-[0_0_15px_rgba(212,20,90,0.3)] transition-all duration-500" 
                  style={{ width: `\${Math.min((todayLoad / 800) * 100, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {displayMetrics.map((metric) => (
          <MetricCard 
            key={metric.title} 
            {...metric} 
            value={metric.value ?? '—'}
          />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecoveryTrend />
        </div>
        <Card className="border-white/5 bg-[#1A1A28] shadow-2xl">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Recent Training Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-8">
              {recentWorkouts.length > 0 ? (
                recentWorkouts.map((workout: any, i: number) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-white/5 p-3 border border-white/5 group-hover:bg-prestigious group-hover:text-white transition-all duration-300">
                        <Zap className="h-5 w-5 text-[#FBB03B] group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-base font-black text-white tracking-tight">{workout.sport}</p>
                        <p className="text-xs font-bold text-zinc-500 uppercase">{workout.durationMinutes}m • {workout.intensity} INTENSITY</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-white tabular-nums">{workout.trainingLoad}</p>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                        {new Date(workout.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">No training data yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
