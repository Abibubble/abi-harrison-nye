/**
 * Counts characters the way people expect, so an emoji counts as one rather than the two units
 * JavaScript stores it as. Each one is at most 4 bytes, which keeps limits predictable in bytes too
 */
export function countCharacters(text: string): number {
  return Array.from(text).length;
}
