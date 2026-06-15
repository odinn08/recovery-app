'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Activity, ShieldCheck, Zap } from 'lucide-react'

interface ReadinessCardProps {
  score: number | null;
}

export function ReadinessCard({ score }: ReadinessCardProps) {
  return (
    <Card className="overflow-hidden border-white/5 bg-[#1A1A28] shadow-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Fight Readiness
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-7xl font-black text-white tracking-tighter">{score ?? '—'}</span>
            <div className="mt-2 flex items-center gap-1.5">
              <div className={`h-2 w-2 rounded-full \${score !== null ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
              <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-400">Potential: <span className={score !== null ? 'text-green-500' : 'text-zinc-600'}>{score !== null ? 'Elite' : 'Unknown'}</span></span>
            </div>
          </div>
          <div className="rounded-2xl p-4 bg-prestigious shadow-xl shadow-[#D4145A]/20">
            <Zap className="h-10 w-10 text-white" />
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/5 p-2 border border-white/5">
                <Activity className="h-4 w-4 text-[#D4145A]" />
              </div>
              <span className="text-sm font-bold text-zinc-300">Cardio Output</span>
            </div>
            <span className="text-sm font-black text-white uppercase tracking-tighter">{score !== null ? 'Peak' : '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/5 p-2 border border-white/5">
                <ShieldCheck className="h-4 w-4 text-[#FBB03B]" />
              </div>
              <span className="text-sm font-bold text-zinc-300">Central Nervous System</span>
            </div>
            <span className="text-sm font-black text-white uppercase tracking-tighter">{score !== null ? 'Primed' : '—'}</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Readiness Level</span>
            <span className="text-xs font-black text-white">{score !== null ? `\${score}%` : '—'}</span>
          </div>
          <div className="h-3 w-full rounded-full bg-zinc-800/50 p-0.5 border border-white/5">
            {score !== null && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `\${score}%` }}
                transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
                className="h-full rounded-full bg-prestigious shadow-[0_0_15px_rgba(212,20,90,0.4)]"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
