import type { CollectionEntry } from 'astro:content';

export type StepEntry = CollectionEntry<'steps'>;

export function parseStepId(id: string) {
  const separator = id.lastIndexOf('/');

  return {
    workshop: id.slice(0, separator),
    step: id.slice(separator + 1),
  };
}

export function groupStepsByWorkshop(steps: StepEntry[]) {
  const grouped = new Map<string, StepEntry[]>();

  for (const step of steps) {
    const { workshop } = parseStepId(step.id);
    const workshopSteps = grouped.get(workshop) ?? [];
    workshopSteps.push(step);
    grouped.set(workshop, workshopSteps);
  }

  for (const workshopSteps of grouped.values()) {
    workshopSteps.sort((a, b) => a.data.order - b.data.order);
  }

  return grouped;
}

export function getWorkshopSteps(steps: StepEntry[], workshop: string) {
  return steps
    .filter((step) => parseStepId(step.id).workshop === workshop)
    .sort((a, b) => a.data.order - b.data.order);
}

export function getStepSlug(step: StepEntry) {
  return parseStepId(step.id).step;
}

export function getStepHref(workshop: string, step: StepEntry) {
  return `/${workshop}/${getStepSlug(step)}`;
}
