export function lerp(start: number, end: number, factor: number): number {
  return (1 - factor) * start + factor * end;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
