import { Filter } from 'bad-words'

const filter = new Filter()

export function censor(text: string): string {
  try {
    return filter.clean(text)
  } catch {
    return text
  }
}
