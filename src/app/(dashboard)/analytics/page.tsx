'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const data = [
  { date: 'Jun 01', recovery: 65, sleep: 7.2, hrv: 62, rhr: 58, load: 450, weight: 79.2 },
  { date: 'Jun 02', recovery: 82, sleep: 8.5, hrv: 74, rhr: 54, load: 600, weight: 79.0 },
  { date: 'Jun 03', recovery: 78, sleep: 7.8, hrv: 70, rhr: 55, load: 300, weight: 78.8 },
  { date: 'Jun 04', recovery: 55, sleep: 6.0, hrv: 58, rhr: 60, load: 850, weight: 78.7 },
  { date: 'Jun 05', recovery: 88, sleep: 9.0, hrv: 80, rhr: 52, load: 0, weight: 78.5 },
  { date: 'Jun 06', recovery: 92, sleep: 8.2, hrv: 82, rhr: 50, load: 500, weight: 78.4 },
  { date: 'Jun 07', recovery: 84, sleep: 7.5, hrv: 78, rhr: 54, load: 720, weight: 78.5 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Analytics</h2>
        <p className="text-zinc-400">Deep dive into your performance and health trends.</p>
      </div>

      <Tabs defaultValue="recovery" className="space-y-6">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="recovery">Recovery</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
        </TabsList>

        <TabsContent value="recovery" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="text-xs text-zinc-500 uppercase">Avg. Recovery (30d)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">78%</p>
                <p className="text-xs text-green-500 mt-1">+4% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="text-xs text-zinc-500 uppercase">Best Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">96%</p>
                <p className="text-xs text-zinc-500 mt-1">Achieved 3 days ago</p>
              </CardContent>
            </Card>
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="text-xs text-zinc-500 uppercase">Consistency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">High</p>
                <p className="text-xs text-zinc-500 mt-1">Based on daily check-ins</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Recovery Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#71717a'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a'}} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="recovery" stroke="#22c55e" fillOpacity={1} fill="url(#colorRec)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Sleep (Hours)</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#71717a'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="sleep" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Training Load Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#71717a'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="load" stroke="#f59e0b" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">HRV Trend (ms)</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#71717a'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="hrv" stroke="#ef4444" strokeWidth={2} dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Resting HR (bpm)</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#71717a'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="rhr" stroke="#3b82f6" strokeWidth={2} dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weight" className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Weight Trend (kg)</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#71717a'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a'}} domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#f59e0b" strokeWidth={3} dot={true} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
