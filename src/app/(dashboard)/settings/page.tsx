import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Bell, Shield, User, Smartphone } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
        <p className="text-zinc-400">Manage your account and app preferences.</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-zinc-400" />
              <CardTitle className="text-white">Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Athlete Name</p>
                <p className="text-sm text-zinc-500">Professional Fighter</p>
              </div>
              <Button variant="outline" className="border-zinc-800 text-zinc-300">Edit</Button>
            </div>
            <Separator className="bg-zinc-800" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Email Address</p>
                <p className="text-sm text-zinc-500">athlete@fightready.com</p>
              </div>
              <Badge variant="secondary" className="bg-zinc-800 text-green-500">Verified</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-zinc-400" />
              <CardTitle className="text-white">Notifications</CardTitle>
            </div>
            <CardDescription className="text-zinc-500">
              Configure how you want to receive readiness alerts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white text-base">Morning Readiness</Label>
                <p className="text-sm text-zinc-500">Daily summary of your recovery score and training recommendations.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-zinc-800" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white text-base">Evening Wind-down</Label>
                <p className="text-sm text-zinc-500">Alerts for sleep debt and recommended bedtime.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-zinc-800" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white text-base">Training Overload</Label>
                <p className="text-sm text-zinc-500">Warning when cumulative load exceeds recommended thresholds.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-zinc-400" />
              <CardTitle className="text-white">Connected Devices</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Apple Health</p>
                  <p className="text-xs text-zinc-500">Last synced: 2 hours ago</p>
                </div>
              </div>
              <Button variant="ghost" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">Disconnect</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Badge({ children, className, variant }: any) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}
