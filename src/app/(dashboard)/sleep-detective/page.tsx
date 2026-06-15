'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Moon, Sparkles, Clock, Calendar, Zap } from 'lucide-react'

export default function SleepDetectivePage() {
  const findings = [
    {
      title: "Bedtime Correlation",
      insight: "Your highest recovery scores occurred when bedtime was before 22:45.",
      evidence: "Avg Recovery: 88% (Early Bedtime) vs 72% (Late Bedtime)",
      icon: Clock,
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Training Impact",
      insight: "Recovery drops after two consecutive high-intensity sparring days.",
      evidence: "HRV typically drops by 15ms after day 2.",
      icon: Zap,
      gradient: "from-[#D4145A] to-[#FBB03B]"
    },
    {
      title: "Sleep Quality",
      insight: "Deep sleep is highest after lower evening training loads.",
      evidence: "Deep sleep avg: 110m (Low Load) vs 85m (High Load)",
      icon: Moon,
      gradient: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <div className="space-y-10 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-black tracking-tighter text-white">SLEEP <span className="text-prestigious">DETECTIVE</span></h2>
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Diagnostic Analytics • Pattern Recognition</p>
        </div>
        <Badge variant="outline" className="border-prestigious text-white bg-prestigious px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#D4145A]/20">
          <Sparkles className="h-3 w-3 mr-2" />
          AI Analysis Active
        </Badge>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {findings.map((finding, i) => (
          <Card key={i} className="border-white/5 bg-[#1A1A28] shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="border-b border-white/5 pb-4">
              <div className="flex items-center gap-4">
                <div className={`rounded-xl p-3 bg-gradient-to-br ${finding.gradient} shadow-lg`}>
                  <finding.icon className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-white text-base font-black tracking-tight uppercase">{finding.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 pb-8">
              <p className="text-sm text-zinc-300 font-bold leading-relaxed italic">
                "{finding.insight}"
              </p>
              <div className="rounded-xl bg-white/5 border border-white/5 p-4">
                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Supporting Evidence</p>
                <p className="text-xs text-white font-bold">{finding.evidence}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-white/5 bg-[#1A1A28] shadow-2xl">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle className="text-xs font-black text-zinc-500 uppercase tracking-widest">Historical Recovery Heatmap</CardTitle>
        </CardHeader>
        <CardContent className="pt-10 pb-10">
          <div className="h-64 w-full rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center bg-white/5">
            <div className="rounded-full bg-prestigious/10 p-4 mb-4">
              <Calendar className="h-8 w-8 text-[#FBB03B]" />
            </div>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Correlation Engine Processing...</p>
            <p className="text-[10px] text-zinc-600 mt-2">Historical data visualization coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
