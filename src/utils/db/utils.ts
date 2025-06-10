import type { LetterMistakes } from './record'

export function mergeLetterMistake(letterMistake1: LetterMistakes, letterMistake2: LetterMistakes): LetterMistakes {
  const result: LetterMistakes = {}

  for (const mistakes of [letterMistake1, letterMistake2]) {
    for (const key in mistakes) {
      if (result[key]) {
        result[key].push(...mistakes[key])
      } else {
        result[key] = [...mistakes[key]]
      }
    }
  }

  return result
}


const mistake1 = { 0: ['a'] };
const mistake2 = { 1: ['b'] };
const merged = mergeLetterMistake(mistake1); 
