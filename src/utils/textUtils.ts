/**
 * Utility functions for text manipulation
 */

/**
 * Convert second-person text to third-person for employee persona descriptions
 * @param text - Text in second person (e.g., "You're feeling...")
 * @returns Text in third person (e.g., "The employee is feeling...")
 */
export const convertToThirdPerson = (text: string): string => {
  return text
    .replace(/You're/g, 'The employee is')
    .replace(/You /g, 'They ')
    .replace(/you're/g, 'they are')
    .replace(/you /g, 'they ')
    .replace(/your /g, 'their ')
    .replace(/Your /g, 'Their ');
};
