'use client'

import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Moon, Activity, Zap, Scale } from 'lucide-react'

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // Mock data for recovery status
  const greenDays = [new Date(2026, 5, 1), new Date(2026, 5, 2), new Date(2026, 5, 5), new Date(2026, 5, 6), new Date(2026, 5, 7), new Date(2026, 5, 8), new Date(2026, 5, 11), new Date(2026, 5, 12), new Date(2026, 5, 14)]
  const yellowDays = [new Date(2026, 5, 3), new Date(2026, 5, 4), new Date(2026, 5, 9), new Date(2026, 5, 10), new Date(2026, 5, 13)]
  const redDays: Date[] = []  // None in this mock

  const modifiers = {
    green: greenDays,
    yellow: yellowDays,
    red: redDays,
  }

  const modifiersStyles = {
    green: { color: 'white', backgroundColor: '#22c55e' },
    yellow: { color: 'white', backgroundColor: '#eab308' },
    red: { color: 'white', backgroundColor: '#ef4444' },
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Calendar</h2>
        <p className="text-zinc-400">Review your historical recovery and training data.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="border-zinc-800 bg-zinc-900/50 lg:col-span-1">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-0"
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
            />
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-white">Day Details: {date?.toLocaleDateString()}</span>
              {date?.getDate() === 14 ? (
                <Badge className="bg-green-500 hover:bg-green-600">Recovered</Badge>
              ) : (
                <Badge variant="outline" className="text-zinc-400 border-zinc-800">Moderate</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 uppercase">Recovery</p>
                <p className="text-2xl font-bold text-white">84</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 uppercase">Readiness</p>
                <p className="text-2xl font-bold text-white">88</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 uppercase">Sleep</p>
                <p className="text-2xl font-bold text-white">7.8h</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 uppercase">Load</p>
                <p className="text-2xl font-bold text-white">720</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-zinc-400">Metrics Breakdown</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg border border-zinc-800 p-3">
                  <Moon className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-xs text-zinc-500">Sleep Consistency</p>
                    <p className="text-sm font-medium text-white">Good (92%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-zinc-800 p-3">
                  <Activity className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="text-xs text-zinc-500">HRV Trend</p>
                    <p className="text-sm font-medium text-white">Improving (+5ms)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-zinc-800 p-3">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-xs text-zinc-500">Subjective Energy</p>
                    <p className="text-sm font-medium text-white">8/10</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-zinc-800 p-3">
                  <Scale className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-zinc-500">Weight</p>
                    <p className="text-sm font-medium text-white">78.5 kg</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-zinc-400">Workouts</h4>
              <div className="rounded-lg border border-zinc-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">BJJ Training</p>
                    <p className="text-xs text-zinc-500">90 mins • High Intensity</p>
                  </div>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">720 Load</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
