import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateRecoveryScore, calculateReadinessScore } from '@/lib/recovery-engine'

export async function GET(req: NextRequest) {
  const userId = 'odinn'
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const metrics = await prisma.dailyMetrics.findUnique({
    where: {
      userId_date: {
        userId,
        date: today,
      },
    },
  })

  // Get yesterday's load for recovery calculation if not already present
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  const trainingSessions = await prisma.trainingSession.findMany({
    where: {
      userId,
      date: {
        gte: yesterday,
        lt: today,
      },
    },
  })
  
  const trainingLoadYesterday = trainingSessions.reduce((acc, s) => acc + s.trainingLoad, 0)

  return NextResponse.json({
    metrics: metrics || null,
    trainingLoadYesterday,
  })
}

export async function POST(req: NextRequest) {
  const userId = 'odinn'
  
  // Ensure profile exists
  await prisma.profile.upsert({
    where: { userId },
    update: {},
    create: { userId, name: 'Odinn' },
  })

  const data = await req.json()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Fetch data for score calculations
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  const yesterdaySessions = await prisma.trainingSession.findMany({
    where: {
      userId,
      date: {
        gte: yesterday,
        lt: today,
      },
    },
  })
  const trainingLoadYesterday = yesterdaySessions.reduce((acc, s) => acc + s.trainingLoad, 0)

  // Mock values for readiness calculation
  const sevenDayAvgLoad = 500
  const thirtyDayAvgLoad = 450
  const sleepConsistency = 85
  const hrvTrend = 'stable'

  const recoveryMetrics = {
    sleepHours: data.sleepHours || 0,
    hrv: data.hrv || 0,
    restingHr: data.restingHr || 0,
    trainingLoadYesterday,
    energyScore: data.energyScore || 5,
  }

  const recoveryScore = calculateRecoveryScore(recoveryMetrics)
  
  const readinessMetrics = {
    ...recoveryMetrics,
    sevenDayAvgLoad,
    thirtyDayAvgLoad,
    sleepConsistency,
    hrvTrend: hrvTrend as 'up' | 'down' | 'stable',
  }
  const readinessScore = calculateReadinessScore(readinessMetrics, recoveryScore)
  
  let status = 'GREEN'
  if (recoveryScore < 50) status = 'RED'
  else if (recoveryScore < 75) status = 'YELLOW'

  const metrics = await prisma.dailyMetrics.upsert({
    where: {
      userId_date: {
        userId,
        date: today,
      },
    },
    update: {
      ...data,
      recoveryScore,
      readinessScore,
      status,
    },
    create: {
      userId,
      date: today,
      ...data,
      recoveryScore,
      readinessScore,
      status,
    },
  })

  return NextResponse.json(metrics)
}
