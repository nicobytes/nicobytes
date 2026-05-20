export const CAREER_START_YEAR = 2013;

export function getYearsOfExperience(now = new Date()): number {
  return now.getFullYear() - CAREER_START_YEAR;
}
