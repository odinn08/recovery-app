export interface NotificationMessage {
  type: 'MORNING' | 'EVENING';
  title: string;
  body: string;
}

export function generateNotification(type: 'MORNING' | 'EVENING', data: {
  recoveryScore?: number;
  readinessScore?: number;
  sleepDebt?: number;
  recommendation?: string;
}): NotificationMessage {
  if (type === 'MORNING') {
    const status = data.recoveryScore && data.recoveryScore >= 80 ? 'Green' : data.recoveryScore && data.recoveryScore >= 60 ? 'Yellow' : 'Red';
    return {
      type: 'MORNING',
      title: `Recovery: ${data.recoveryScore}`,
      body: `${status} day. ${data.recommendation || 'Check your dashboard for details.'}`
    };
  } else {
    return {
      type: 'EVENING',
      title: `Evening Summary`,
      body: data.sleepDebt && data.sleepDebt > 1 
        ? `Sleep debt this week: ${data.sleepDebt.toFixed(1)} hours. Recommend earlier bedtime.`
        : `Recovery is on track. Maintain your current sleep schedule.`
    };
  }
}
