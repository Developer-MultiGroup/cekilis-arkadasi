import stages  from "@/data/stages";

export function checkLocked(stageNumber: number): boolean {
  const stage = stages.find((s) => s.index === stageNumber);

  if (!stage) {
    console.error(`Stage with index ${stageNumber} not found.`);
    return true; // Assume locked if stage not found
  }

  const currentDate = new Date();
  const startDate = new Date(stage.start_date);

  // Locked if current date is before start date or after end date
  return currentDate < startDate
}
