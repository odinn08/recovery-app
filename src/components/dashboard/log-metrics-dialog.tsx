'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Activity } from 'lucide-react'

const formSchema = z.object({
  sleepHours: z.coerce.number().min(0).max(24),
  deepSleepMinutes: z.coerce.number().min(0),
  hrv: z.coerce.number().min(0),
  restingHr: z.coerce.number().min(0),
  weight: z.coerce.number().min(0),
  energyScore: z.coerce.number().min(1).max(10),
  sorenessScore: z.coerce.number().min(1).max(10),
})

export function LogMetricsDialog() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sleepHours: 7,
      deepSleepMinutes: 60,
      hrv: 60,
      restingHr: 55,
      weight: 80,
      energyScore: 7,
      sorenessScore: 3,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/dashboard/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error('Failed to save')

      toast.success("Health metrics logged successfully!")
      queryClient.invalidateQueries({ queryKey: ['metrics'] })
      setOpen(false)
    } catch (error) {
      toast.error("Failed to log health metrics")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-white/10 text-white font-bold uppercase tracking-widest rounded-xl px-6 h-12 hover:bg-white/5 transition-all">
          <Activity className="h-4 w-4 mr-2" />
          Log Today's Stats
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-white/5 bg-[#1A1A28] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter">Log Health Metrics</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="sleepHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sleep Hours</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} className="border-white/10 bg-white/5 text-white h-11 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deepSleepMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Deep Sleep (min)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="border-white/10 bg-white/5 text-white h-11 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hrv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">HRV (ms)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="border-white/10 bg-white/5 text-white h-11 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="restingHr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Resting HR (bpm)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="border-white/10 bg-white/5 text-white h-11 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} className="border-white/10 bg-white/5 text-white h-11 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="energyScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Energy (1-10)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={10} {...field} className="border-white/10 bg-white/5 text-white h-11 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sorenessScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Soreness (1-10)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={10} {...field} className="border-white/10 bg-white/5 text-white h-11 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full h-12 bg-prestigious text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-[#D4145A]/20">
              Update Daily Metrics
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
