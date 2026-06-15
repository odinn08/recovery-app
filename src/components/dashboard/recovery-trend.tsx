'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts'

const data = [
  { date: 'Mon', recovery: 65, readiness: 70 },
  { date: 'Tue', recovery: 82, readiness: 75 },
  { date: 'Wed', recovery: 78, readiness: 80 },
  { date: 'Thu', recovery: 55, readiness: 60 },
  { date: 'Fri', recovery: 88, readiness: 85 },
  { date: 'Sat', recovery: 92, readiness: 90 },
  { date: 'Sun', recovery: 84, readiness: 88 },
]

const chartConfig = {
  recovery: {
    label: 'Recovery',
    color: 'hsl(var(--chart-1))',
  },
  readiness: {
    label: 'Readiness',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function RecoveryTrend() {
  return (
    <Card className="border-white/5 bg-[#1A1A28] shadow-2xl">
      <CardHeader className="border-b border-white/5 pb-4">
        <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Performance Optimization Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="lineGradient1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D4145A" />
                  <stop offset="100%" stopColor="#D4145A" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient id="lineGradient2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FBB03B" />
                  <stop offset="100%" stopColor="#FBB03B" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" strokeOpacity={0.3} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} 
                domain={[0, 100]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="recovery"
                stroke="#D4145A"
                strokeWidth={4}
                dot={{ r: 4, fill: "#D4145A", strokeWidth: 2, stroke: "#1A1A28" }}
                activeDot={{ r: 6, strokeWidth: 0, fill: "#D4145A" }}
              />
              <Line
                type="monotone"
                dataKey="readiness"
                stroke="#FBB03B"
                strokeWidth={4}
                dot={{ r: 4, fill: "#FBB03B", strokeWidth: 2, stroke: "#1A1A28" }}
                activeDot={{ r: 6, strokeWidth: 0, fill: "#FBB03B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
