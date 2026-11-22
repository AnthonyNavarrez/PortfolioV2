const BAD_WORDS = [
  'fuck', 'shit', 'ass', 'bitch', 'cunt', 'dick', 'cock', 'pussy',
  'nigger', 'nigga', 'faggot', 'fag', 'whore', 'slut', 'bastard',
  'damn', 'hell', 'piss', 'crap', 'retard', 'rape', 'kill yourself',
  'kys', 'nazi', 'porn', 'sex',
]

export function cleanText(text: string): string {
  let result = text
  for (const word of BAD_WORDS) {
    const regex = new RegExp(`\\b${word}s?\\b`, 'gi')
    result = result.replace(regex, '*'.repeat(word.length))
  }
  return result
}
