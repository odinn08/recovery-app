'use client'

import { TrainingForm } from '@/components/training/training-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap } from 'lucide-react'

export default function TrainingPage() {
  const recentWorkouts = [
    { id: 1, sport: 'BJJ', duration: '90m', intensity: '8/10', load: 720, date: 'Today, 18:00', notes: 'Worked on guard passes.' },
    { id: 2, sport: 'Boxing', duration: '60m', intensity: '7/10', load: 420, date: 'Yesterday, 17:30', notes: 'Focus on head movement.' },
    { id: 3, sport: 'Running', duration: '30m', intensity: '5/10', load: 150, date: '2 days ago', notes: 'Zone 2 cardio.' },
  ]

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black tracking-tighter text-white">TRAINING <span className="text-prestigious">LOG</span></h2>
        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Load Monitoring • Volume Diagnostics</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <TrainingForm />
        
        <div className="space-y-8">
          <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <div className="h-1.5 w-8 bg-prestigious rounded-full" />
            Recent Sessions
          </h3>
          <div className="space-y-6">
            {recentWorkouts.map((workout) => (
              <Card key={workout.id} className="border-white/5 bg-[#1A1A28] shadow-2xl overflow-hidden group">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="rounded-xl bg-prestigious p-4 shadow-lg shadow-[#D4145A]/20 transition-transform group-hover:scale-110">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-white tracking-tight">{workout.sport}</h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{workout.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-white tabular-nums tracking-tighter">{workout.load}</p>
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mt-1">Total Load</p>
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                    <div>
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Duration</p>
                      <p className="text-base font-bold text-white tracking-tight">{workout.duration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Intensity</p>
                      <p className="text-base font-bold text-white tracking-tight">{workout.intensity}</p>
                    </div>
                  </div>
                  {workout.notes && (
                    <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Technical Notes</p>
                      <p className="text-sm text-zinc-300 font-bold leading-relaxed">{workout.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
