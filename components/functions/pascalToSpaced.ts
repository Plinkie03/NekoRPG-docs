/**
 * Converts PascalCase string to a string with spaces between words.
 *
 * @param pascalCaseString The input string in PascalCase format.
 * @returns The input string with spaces between words.
 */
export function pascalCaseToSpaced(pascalCaseString: string): string {
  return pascalCaseString.replace(/([A-Z])/g, ' $1').trim();
}
