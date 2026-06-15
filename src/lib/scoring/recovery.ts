export interface RecoveryInput {
  sleepHours: number;
  hrv: number;
  restingHr: number;
  trainingLoadYesterday: number;
  energyScore: number; // 1-10
}

export function calculateRecoveryScore(input: RecoveryInput) {
  // Normalize Sleep (0-10h, 8h = 100%)
  const sleepScore = Math.min((input.sleepHours / 8) * 100, 100);

  // Normalize HRV (Base: 20ms, Target: 100ms)
  const hrvScore = Math.min(Math.max((input.hrv - 20) / (100 - 20), 0) * 100, 100);

  // Normalize Resting HR (Base: 80bpm, Target: 40bpm)
  const rhrScore = Math.min(Math.max((80 - input.restingHr) / (80 - 40), 0) * 100, 100);

  // Normalize Training Load Yesterday (Penalty)
  // 0 load = 100 score, 1000 load = 0 score
  const loadScore = Math.min(Math.max((1000 - input.trainingLoadYesterday) / 1000, 0) * 100, 100);

  // Normalize Energy (1-10)
  const energyScore = (input.energyScore / 10) * 100;

  const totalScore = 
    (sleepScore * 0.35) +
    (hrvScore * 0.25) +
    (rhrScore * 0.15) +
    (loadScore * 0.15) +
    (energyScore * 0.10);

  const roundedScore = Math.round(totalScore);

  let status: 'green' | 'yellow' | 'red' = 'red';
  if (roundedScore >= 80) status = 'green';
  else if (roundedScore >= 60) status = 'yellow';

  return {
    score: roundedScore,
    status
  };
}
