'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRecoveryStatus } from '@/lib/recovery-engine'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

interface RecoveryCardProps {
  score: number | null;
}

export function RecoveryCard({ score }: RecoveryCardProps) {
  const status = score !== null ? getRecoveryStatus(score) : { label: 'NO DATA', color: 'text-zinc-500', recommendation: 'Log metrics to see recovery' };

  return (
    <Card className="overflow-hidden border-white/5 bg-[#1A1A28] shadow-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Recovery Score
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-2 pb-8">
        <div className="relative flex items-center justify-center">
          <svg className="h-52 w-52 -rotate-90">
            <circle
              className="text-zinc-800/50"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="90"
              cx="104"
              cy="104"
            />
            {score !== null && (
              <motion.circle
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 90}
                initial={{ strokeDashoffset: 2 * Math.PI * 90 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 90 * (1 - score / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
                stroke="url(#prestigiousGradient)"
                fill="transparent"
                r="90"
                cx="104"
                cy="104"
              />
            )}
            <defs>
              <linearGradient id="prestigiousGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4145A" />
                <stop offset="100%" stopColor="#FBB03B" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-7xl font-black text-white tracking-tighter"
            >
              {score ?? '—'}
            </motion.span>
            <div className={`mt-1 rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-tighter \${status.color} bg-white/5 border border-white/10`}>
              {status.label}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center px-4">
          <p className="text-xl font-bold text-white leading-tight">{status.recommendation}</p>
          {score !== null && (
            <div className="mt-3 flex items-center justify-center gap-2 rounded-full bg-white/5 py-1 px-4 border border-white/5">
              <TrendingUp className="h-4 w-4 text-[#FBB03B]" />
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">+5% from yesterday</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
