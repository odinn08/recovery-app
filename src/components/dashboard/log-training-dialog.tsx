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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

const formSchema = z.object({
  sport: z.string({
    required_error: "Please select a sport.",
  }),
  date: z.string(),
  durationMinutes: z.coerce.number().min(1, "Duration must be at least 1 minute."),
  intensity: z.coerce.number().min(1).max(10),
  notes: z.string().optional(),
})

export function LogTrainingDialog() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      durationMinutes: 60,
      intensity: 7,
      notes: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/dashboard/training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error('Failed to save')

      toast.success("Training session logged successfully!")
      queryClient.invalidateQueries({ queryKey: ['training'] })
      queryClient.invalidateQueries({ queryKey: ['metrics'] })
      setOpen(false)
      form.reset()
    } catch (error) {
      toast.error("Failed to log training session")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-prestigious text-white font-bold uppercase tracking-widest rounded-xl px-6 h-12 shadow-lg shadow-[#D4145A]/20 hover:scale-[1.02] transition-transform">
          <Plus className="h-4 w-4 mr-2" />
          Log Training
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-white/5 bg-[#1A1A28] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter">Log Training Session</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="sport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Discipline</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-white/10 bg-white/5 text-white h-11 rounded-xl">
                        <SelectValue placeholder="Select discipline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-white/10 bg-[#1A1A28] text-white rounded-xl">
                      <SelectItem value="Boxing">Boxing</SelectItem>
                      <SelectItem value="BJJ">BJJ</SelectItem>
                      <SelectItem value="Gym">Gym</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="border-white/10 bg-white/5 text-white h-11 rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="durationMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Duration (min)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="border-white/10 bg-white/5 text-white h-11 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intensity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Intensity (1-10)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={10} {...field} className="border-white/10 bg-white/5 text-white h-11 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional notes" {...field} className="border-white/10 bg-white/5 text-white h-11 rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-12 bg-prestigious text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-[#D4145A]/20">
              Save Session
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
