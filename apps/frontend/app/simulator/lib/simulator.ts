export interface SimulatorFormValues {
  initialAmount: number
  monthlyContribution: number
  months: number
}

export interface SimulationResult {
  initialAmount: number
  monthlyContribution: number
  futureValue: number
  totalContributions: number
  estimatedInterest: number
  months: number
}

export const ANNUAL_RATE = 0.065

export function calculateProjection({
  initialAmount,
  monthlyContribution,
  months
}: SimulatorFormValues): SimulationResult {
  const monthlyRate = ANNUAL_RATE / 12
  const growthFactor = (1 + monthlyRate) ** months

  const initialGrowth = initialAmount * growthFactor
  const contributionGrowth =
    monthlyRate === 0
      ? monthlyContribution * months
      : monthlyContribution * ((growthFactor - 1) / monthlyRate)

  const futureValue = initialGrowth + contributionGrowth
  const totalContributions = initialAmount + monthlyContribution * months

  return {
    initialAmount,
    monthlyContribution,
    futureValue,
    totalContributions,
    estimatedInterest: futureValue - totalContributions,
    months
  }
}
