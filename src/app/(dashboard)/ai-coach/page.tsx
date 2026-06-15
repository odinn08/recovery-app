import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, TrendingUp, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react'

export default function AICoachPage() {
  const weeklyWins = [
    "Improved sleep consistency by 15% compared to last week.",
    "Maintained a healthy training load despite high intensity BJJ sessions.",
    "Resting HR trended downwards, indicating improved cardiovascular fitness."
  ]

  const problems = [
    "Recovery scores dipped mid-week following consecutive late-night training.",
    "Deep sleep percentage is lower than your monthly average."
  ]

  const recommendations = [
    "Aim for a bedtime before 22:45 to maximize recovery potential.",
    "Consider a lower-intensity technical session tomorrow to allow HRV to stabilize.",
    "Increase hydration on high-load days to mitigate resting HR spikes."
  ]

  return (
    <div className="space-y-10 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-black tracking-tighter text-white">AI <span className="text-prestigious">COACH</span></h2>
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Performance Diagnostics • Tactical Intelligence</p>
        </div>
        <Badge variant="outline" className="border-prestigious text-white bg-prestigious px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#D4145A]/20">
          <Zap className="h-3 w-3 mr-2" />
          Neural Engine Active
        </Badge>
      </div>

      <Card className="border-white/5 bg-[#1A1A28] overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Zap className="h-64 w-64 text-[#FBB03B]" />
        </div>
        <CardHeader className="border-b border-white/5 pb-6">
          <CardTitle className="text-2xl font-black text-white tracking-tight uppercase">Performance Report: June 08 - June 14</CardTitle>
          <CardDescription className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Comprehensive diagnostic synthesis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-12 pt-10 relative">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-green-500">
                <div className="rounded-lg bg-green-500/10 p-2 border border-green-500/20">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="font-black uppercase tracking-widest text-xs">Performance Wins</h3>
              </div>
              <ul className="space-y-4">
                {weeklyWins.map((win, i) => (
                  <li key={i} className="text-sm text-zinc-300 font-bold border-l-2 border-green-500/30 pl-4 py-1">
                    {win}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#D4145A]">
                <div className="rounded-lg bg-[#D4145A]/10 p-2 border border-[#D4145A]/20">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <h3 className="font-black uppercase tracking-widest text-xs">Anomalies</h3>
              </div>
              <ul className="space-y-4">
                {problems.map((prob, i) => (
                  <li key={i} className="text-sm text-zinc-300 font-bold border-l-2 border-[#D4145A]/30 pl-4 py-1">
                    {prob}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#FBB03B]">
                <div className="rounded-lg bg-[#FBB03B]/10 p-2 border border-[#FBB03B]/20">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="font-black uppercase tracking-widest text-xs">Tactical Directives</h3>
              </div>
              <ul className="space-y-4">
                {recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-zinc-300 font-bold border-l-2 border-[#FBB03B]/30 pl-4 py-1">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/5 p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-prestigious" />
            <h4 className="text-sm font-black text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#FBB03B]" />
              Executive Summary
            </h4>
            <p className="text-zinc-300 leading-relaxed font-bold text-base">
              Your overall readiness is trending in the right direction. You've successfully managed the increased training load this week without hitting an overtraining state. However, the data suggests that your recovery is highly sensitive to sleep timing. On nights where you trained past 20:00, your sleep onset was delayed, impacting your HRV the following morning. Moving forward, try to implement a stricter wind-down routine on late training nights to protect your recovery floor.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
