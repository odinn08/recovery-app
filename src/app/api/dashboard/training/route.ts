import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const userId = 'odinn'
  
  const sessions = await prisma.trainingSession.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 5,
  })

  return NextResponse.json(sessions)
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
  
  // Calculate training load
  const trainingLoad = data.durationMinutes * data.intensity

  const session = await prisma.trainingSession.create({
    data: {
      userId,
      ...data,
      trainingLoad,
      date: new Date(data.date),
    },
  })

  return NextResponse.json(session)
}
