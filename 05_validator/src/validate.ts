import validator from 'validator'

const punctuationSuperset: string[] = [
  '.', // Period
  ',', // Comma
  '?', // Question mark
  '¿', // Inverted question mark
  '!', // Exclamation mark
  '"', // Double quote
  "'", // Single quote / Apostrophe
  ':', // Colon
  ';', // Semicolon
  '-', // Hyphen
  '–', // En dash
  '—', // Em dash
  //'...', // Ellipsis
  '(', // Left parenthesis
  ')', // Right parenthesis
  '[', // Left square bracket
  ']', // Right square bracket
  '{', // Left curly brace
  '}', // Right curly brace
  '/', // Forward slash
  '\\', // Backslash
  '|', // Pipe
  '*', // Asterisk
  '&', // Ampersand
  '@', // At symbol
  '_', // Underscore
  '~', // Tilde
  '،', // Arabic comma
  '؟', // Arabic question mark
  '«', // Left guillemet (used in French, Arabic, etc.)
  '»', // Right guillemet (used in French, Arabic, etc.)
  '„', // Left low double quote (used in German, etc.)
  '“', // Left double quote (used in German, etc.)
  '”', // Right double quote (used in German, etc.)
  '「', // Japanese left quote
  '」', // Japanese right quote
  '『', // Japanese left double quote
  '』', // Japanese right double quote
  '。', // Full-width period (used in Chinese, Japanese, etc.)
  '，', // Full-width comma (used in Chinese, Japanese, etc.)
  '？', // Full-width question mark (used in Chinese, Japanese, etc.)
  '！', // Full-width exclamation mark (used in Chinese, Japanese, etc.)
  '：', // Full-width colon (used in Chinese, Japanese, etc.)
  '；', // Full-width semicolon (used in Chinese, Japanese, etc.)
  '（', // Full-width left parenthesis (used in Chinese, Japanese, etc.)
  '）', // Full-width right parenthesis (used in Chinese, Japanese, etc.)
  '【', // Full-width left bracket (used in Chinese, Japanese, etc.)
  '】', // Full-width right bracket (used in Chinese, Japanese, etc.)
  '《', // Full-width left double angle bracket (used in Chinese, Japanese, etc.)
  '》', // Full-width right double angle bracket (used in Chinese, Japanese, etc.)
  '…', // Full-width ellipsis (used in Chinese, Japanese, etc.)
  '〜', // Full-width tilde (used in Japanese, etc.)
]

function validatePunctuation(word: string, max = 2): boolean {
  // Count how many punctuation characters are in the word
  const punctuationCount = [...word].filter((char) => punctuationSuperset.includes(char)).length

  // Return true if the word has max or fewer punctuation characters
  return punctuationCount <= max
}

function removePunctuation(input: string): string {
  // Create a regex pattern from the punctuation superset
  const punctuationRegex = new RegExp(`[${punctuationSuperset.map((p) => `\\${p}`).join('')}]`, 'g')

  // Replace all punctuation with an empty string
  return input.replace(punctuationRegex, '')
}

export function validate(strings: Array<string>, locale: validator.AlphaLocale): Array<string> {
  const returnArray = new Array<string>()

  for (let index = 0; index < strings.length; index++) {
    const element = strings[index].trim()

    if (element.length <= 1 || element.length > 40) {
      continue
    }

    const withoutPunctuation = removePunctuation(element)

    // after removing punctuation check alpha within locale.
    if (validator.isAlphanumeric(withoutPunctuation, locale)) {
      if (validatePunctuation(element, 2)) {
        returnArray.push(element)
      }
    }
  }
  return returnArray
}
