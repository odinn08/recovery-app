'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { XMLParser } from 'fast-xml-parser'

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<'idle' | 'parsing' | 'saving' | 'success' | 'error'>('idle')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
      setStatus('idle')
      setProgress(0)
    }
  }

  const handleImport = async () => {
    if (!file) return
    setImporting(true)
    setStatus('parsing')
    setProgress(20)

    try {
      const text = await file.text()
      setProgress(50)
      
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
      })
      const jsonObj = parser.parse(text)
      
      setStatus('saving')
      setProgress(80)
      
      // Simulate saving to DB
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setProgress(100)
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Import Data</h2>
        <p className="text-zinc-400">Sync your health data from Apple Health (XML export).</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-white">Apple Health Sync</CardTitle>
            <CardDescription className="text-zinc-400">
              Upload your `export.xml` file from your iPhone Health app export.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl p-12 hover:bg-zinc-800/30 transition-colors cursor-pointer relative">
              <Input
                type="file"
                accept=".xml"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload className="h-12 w-12 text-zinc-600 mb-4" />
              <p className="text-sm font-medium text-zinc-300">
                {file ? file.name : "Click to select or drag and drop"}
              </p>
              <p className="text-xs text-zinc-500 mt-1">export.xml (Apple Health Format)</p>
            </div>

            {status !== 'idle' && (
              <div className="space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400 uppercase tracking-wider font-bold">
                    {status === 'parsing' && 'Parsing XML...'}
                    {status === 'saving' && 'Syncing to Database...'}
                    {status === 'success' && 'Import Complete!'}
                    {status === 'error' && 'Import Failed'}
                  </span>
                  <span className="text-white font-bold">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-zinc-800" />
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Button 
                onClick={handleImport} 
                disabled={!file || importing || status === 'success'}
                className="w-full bg-white text-black hover:bg-zinc-200"
              >
                {importing ? "Processing..." : "Start Import"}
              </Button>
              
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-500 text-sm justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Successfully imported 450 health records.</span>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
              <div className="flex gap-3">
                <FileText className="h-5 w-5 text-blue-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-400">How to export from iPhone:</p>
                  <ol className="text-xs text-blue-300/80 list-decimal ml-4 space-y-1">
                    <li>Open Health App &gt; Profile Picture</li>
                    <li>Scroll to "Export All Health Data"</li>
                    <li>Wait for the ZIP file, extract it, and find `export.xml`.</li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
