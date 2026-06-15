'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Moon, Heart, Activity, Scale } from 'lucide-react'

const icons = {
  Moon,
  Heart,
  Activity,
  Scale
}

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: keyof typeof icons;
  color: string;
  trend?: string;
  trendColor?: string;
}

export function MetricCard({ title, value, unit, icon, color, trend, trendColor }: MetricCardProps) {
  const Icon = icons[icon]
  const isNoData = value === null || value === '—'

  return (
    <Card className="border-white/5 bg-[#1A1A28] shadow-xl transition-all hover:scale-[1.02] hover:shadow-prestigious/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`rounded-xl p-3 shadow-lg \${isNoData ? 'bg-zinc-800/50' : 'bg-prestigious shadow-[#D4145A]/20'}`}>
            {Icon && <Icon className={`h-6 w-6 \${isNoData ? 'text-zinc-500' : 'text-white'}`} />}
          </div>
          {trend && !isNoData && (
            <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold bg-white/5 \${trendColor}`}>
              <TrendingUp className="h-3 w-3" />
              {trend}
            </div>
          )}
        </div>
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{title}</p>
          <div className="mt-1 flex items-baseline gap-1">
            <h3 className={`text-3xl font-black tabular-nums \${isNoData ? 'text-zinc-700' : 'text-white'}`}>
              {value ?? '—'}
            </h3>
            {unit && !isNoData && <span className="text-sm font-medium text-zinc-500">{unit}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { TrendingUp } from 'lucide-react'

