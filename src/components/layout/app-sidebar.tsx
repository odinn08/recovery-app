'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Activity,
  BarChart2,
  Moon,
  Zap,
  Settings,
  ChevronRight,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Calendar',
    url: '/calendar',
    icon: Calendar,
  },
  {
    title: 'Training',
    url: '/training',
    icon: Activity,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart2,
  },
  {
    title: 'Sleep Detective',
    url: '/sleep-detective',
    icon: Moon,
  },
  {
    title: 'AI Coach',
    url: '/ai-coach',
    icon: Zap,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5 bg-[#0E0E16]">
      <SidebarHeader className="border-b border-white/5 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-prestigious shadow-lg shadow-[#D4145A]/20">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white group-data-[collapsible=icon]:hidden">
            Fight<span className="text-prestigious">Ready</span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu className="gap-2">
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  size="lg"
                  className={`
                    transition-all duration-200 rounded-xl px-4 py-6
                    ${isActive 
                      ? "bg-white/10 text-white font-bold border border-white/10" 
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <Link href={item.url} className="flex items-center gap-4">
                    <div className={`
                      p-2 rounded-lg transition-colors
                      ${isActive ? "bg-prestigious text-white" : "bg-zinc-800/50 text-zinc-500"}
                    `}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-base">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/5 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl px-4 py-6"
            >
              <Link href="/settings" className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-zinc-800/50 text-zinc-500">
                  <Settings className="h-5 w-5" />
                </div>
                <span className="text-base">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
