export interface RecoveryMetrics {
  sleepHours: number;
  hrv: number;
  restingHr: number;
  trainingLoadYesterday: number;
  energyScore: number; // 1-10
}

export function calculateRecoveryScore(metrics: RecoveryMetrics): number {
  // Normalize Sleep (0-10h, 8h = 100)
  const sleepScore = Math.min((metrics.sleepHours / 8) * 100, 100);

  // Normalize HRV (20-100 ms, 100+ = 100)
  const hrvScore = Math.min(Math.max((metrics.hrv - 20) / (100 - 20), 0) * 100, 100);

  // Normalize Resting HR (80-40 bpm, 40- = 100)
  const rhrScore = Math.min(Math.max((80 - metrics.restingHr) / (80 - 40), 0) * 100, 100);

  // Normalize Training Load Penalty (0-1000, 0 = 100, 1000 = 0)
  // Higher load yesterday = lower recovery today
  const loadScore = Math.min(Math.max((1000 - metrics.trainingLoadYesterday) / 1000, 0) * 100, 100);

  // Normalize Subjective Energy (1-10)
  const energyScore = (metrics.energyScore / 10) * 100;

  const totalScore = 
    (sleepScore * 0.35) +
    (hrvScore * 0.25) +
    (rhrScore * 0.15) +
    (loadScore * 0.15) +
    (energyScore * 0.10);

  return Math.round(totalScore);
}

export function getRecoveryStatus(score: number) {
  if (score >= 80) return { label: 'GREEN', recommendation: 'Hard training recommended', color: 'text-green-500' };
  if (score >= 60) return { label: 'YELLOW', recommendation: 'Train but reduce volume', color: 'text-yellow-500' };
  return { label: 'RED', recommendation: 'Recovery day recommended', color: 'text-red-500' };
}

export interface ReadinessMetrics extends RecoveryMetrics {
  sevenDayAvgLoad: number;
  thirtyDayAvgLoad: number;
  sleepConsistency: number; // 0-100
  hrvTrend: 'up' | 'down' | 'stable';
}

export function calculateReadinessScore(metrics: ReadinessMetrics, recoveryScore: number): number {
  // Acute:Chronic Workload Ratio (ACWR)
  // Optimal is 0.8 to 1.3
  const acwr = metrics.thirtyDayAvgLoad > 0 ? metrics.sevenDayAvgLoad / metrics.thirtyDayAvgLoad : 1;
  let loadScore = 100;
  if (acwr > 1.5) loadScore = 50; // Overtraining risk
  else if (acwr < 0.8) loadScore = 80; // Undertraining

  const trendBonus = metrics.hrvTrend === 'up' ? 5 : metrics.hrvTrend === 'down' ? -5 : 0;
  
  const readiness = (recoveryScore * 0.6) + (loadScore * 0.2) + (metrics.sleepConsistency * 0.2) + trendBonus;
  
  return Math.round(Math.min(Math.max(readiness, 0), 100));
}
