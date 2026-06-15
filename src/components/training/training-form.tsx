'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

const formSchema = z.object({
  sport: z.string({
    required_error: "Please select a sport.",
  }),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute."),
  intensity: z.coerce.number().min(1).max(10),
  notes: z.string().optional(),
})

const sports = [
  "Boxing",
  "BJJ",
  "MMA",
  "Wrestling",
  "Muay Thai",
  "Kickboxing",
  "Strength Training",
  "Running",
]

export function TrainingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: 60,
      intensity: 7,
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const trainingLoad = values.duration * values.intensity
    console.log({ ...values, trainingLoad })
    toast.success("Training session logged successfully!")
    form.reset()
  }

  return (
    <Card className="border-white/5 bg-[#1A1A28] shadow-2xl">
      <CardHeader className="border-b border-white/5 pb-4">
        <CardTitle className="text-xs font-black text-zinc-500 uppercase tracking-widest">Diagnostic Input: Log Training</CardTitle>
      </CardHeader>
      <CardContent className="pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="sport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Discipline</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-white/10 bg-white/5 text-white h-12 rounded-xl focus:ring-prestigious">
                        <SelectValue placeholder="Select combat discipline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-white/10 bg-[#1A1A28] text-white rounded-xl">
                      {sports.map((sport) => (
                        <SelectItem key={sport} value={sport} className="focus:bg-prestigious focus:text-white">{sport}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Duration (min)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        className="border-white/10 bg-white/5 text-white h-12 rounded-xl focus:border-prestigious" 
                      />
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
                      <Input 
                        type="number" 
                        min={1} 
                        max={10} 
                        {...field} 
                        className="border-white/10 bg-white/5 text-white h-12 rounded-xl focus:border-prestigious" 
                      />
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
                  <FormLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Strategic Notes</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Sparring dynamics, specific drills, etc." 
                      {...field} 
                      className="border-white/10 bg-white/5 text-white h-12 rounded-xl focus:border-prestigious" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-14 bg-prestigious text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-[#D4145A]/30 hover:scale-[1.02] transition-transform">
              Synchronize Data
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
