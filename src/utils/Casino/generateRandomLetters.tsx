export default function generateRandomLetters(
  length: number,
): [string, boolean][] {
  return Array.from({ length: length }).map(() => [
    String.fromCharCode(65 + Math.floor(Math.random() * 25)) + "",
    false,
  ]);
}
