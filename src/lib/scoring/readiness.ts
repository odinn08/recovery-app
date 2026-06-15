export interface ReadinessInput {
  recoveryScore: number;
  sevenDayAvgLoad: number;
  thirtyDayAvgLoad: number;
  hrvTrend: 'improving' | 'stable' | 'declining';
  sleepConsistency: number; // 0-100
}

export function calculateReadinessScore(input: ReadinessInput) {
  // Acute:Chronic Workload Ratio (ACWR)
  const acwr = input.thirtyDayAvgLoad > 0 ? input.sevenDayAvgLoad / input.thirtyDayAvgLoad : 1;
  
  let workloadScore = 100;
  if (acwr > 1.5) workloadScore = 40; // Overtraining risk
  else if (acwr > 1.3) workloadScore = 70;
  else if (acwr < 0.8) workloadScore = 80; // Detraining

  const trendBonus = input.hrvTrend === 'improving' ? 5 : input.hrvTrend === 'declining' ? -10 : 0;

  const totalScore = 
    (input.recoveryScore * 0.50) +
    (workloadScore * 0.30) +
    (input.sleepConsistency * 0.20) +
    trendBonus;

  return Math.round(Math.min(Math.max(totalScore, 0), 100));
}
