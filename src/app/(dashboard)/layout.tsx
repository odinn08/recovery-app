import { AppSidebar } from '@/components/layout/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#0E0E16]">
        <header className="flex h-20 shrink-0 items-center gap-2 border-b border-white/5 px-8 sticky top-0 bg-[#0E0E16]/80 backdrop-blur-xl z-10">
          <SidebarTrigger className="-ml-1 text-zinc-500 hover:text-white transition-colors" />
          <Separator orientation="vertical" className="mr-4 h-6 bg-white/10" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-sm font-black text-zinc-400 uppercase tracking-[0.2em]">
              Elite Athlete <span className="text-prestigious">Dashboard</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">System Online</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
