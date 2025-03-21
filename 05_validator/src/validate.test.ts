import validator from 'validator'
import { validate, normalise } from './validate'
import { expect, it, describe } from '@jest/globals'

describe('validate', () => {
  it('will not error with an empty list of strings', () => {
    // ARRANGE
    const strings: Array<string> = []
    // ACT
    const validated = validate(strings, 'en-US')
    // ASSERT
    expect(validated).toStrictEqual(strings)
  })

  it('will not error with empty list', () => {
    // ARRANGE
    const strings: Array<string> = []
    // ACT
    const validated = validate(strings, 'en-US')
    // ASSERT
    expect(validated).toStrictEqual(strings)
  })

  it('will filter words containing spaces in middle of string others will be trimmed', () => {
    // ARRANGE
    const strings: Array<string> = ['', ' ', 'first', 'second', 'third word', 'fourth ', 'fifth  ', '   sixth']
    // ACT
    const validated = validate(strings, 'en-US')
    // ASSERT
    expect(validated).toStrictEqual(['first', 'second', 'fourth', 'fifth', 'sixth'])
  })

  it('will filter words only 1 character in length', () => {
    // ARRANGE
    const strings: Array<string> = ['a', 'second', 'third', 'z', 'fifth']
    // ACT
    const validated = validate(strings, 'en-US')
    // ASSERT
    expect(validated).toStrictEqual(['second', 'third', 'fifth'])
  })

  it('will filter words over 40 characters in length', () => {
    // ARRANGE
    const strings: Array<string> = ['onetwofouronetwofouronetwofouronetwofourone', 'third', 'z', 'fifth']
    // ACT
    const validated = validate(strings, 'en-US')
    // ASSERT
    expect(validated).toStrictEqual(['third', 'fifth'])
  })

  it('will filter words containing control characters', () => {
    // ARRANGE
    const strings: Array<string> = ['Hello\r\nWorld', '\d \t \n \r \f \b \v', 'Hello\nWorld', 'Hello\tWorld']
    // ACT
    const validated = validate(strings, 'en-US')
    // ASSERT
    expect(validated).toStrictEqual([])
  })

  it('will not filter words from different locales', () => {
    // ARRANGE
    const strings: Map<validator.AlphaLocale, Array<string>> = new Map<validator.AlphaLocale, Array<string>>([
      ['ar-AE', ['السلام', 'عليكم', 'أهلاً', 'وسهلاً']],
      ['ar', ['مرحبًا', 'كيف', 'حالك']],
      ['ar-BH', ['شلونك', 'أخبارك']],
      ['ar-DZ', ['واش', 'راك', 'كل', 'شيء', 'بخير']],
      ['ar-EG', ['إزيك', 'عامل', 'إيه']],
      ['ar-IQ', ['شلونك', 'شخبارك']],
      ['ar-JO', ['كيف', 'حالك', 'شو', 'الأخبار']],
      ['ar-KW', ['شلونك', 'يا', 'الحبيب']],
      ['ar-LB', ['كيفك', 'شو', 'الأخبار']],
      ['ar-LY', ['كيف', 'حالك', 'كيف', 'الجو']],
      ['ar-MA', ['كيداير', 'لاباس']],
      ['ar-QA', ['شلونك', 'كل', 'شيء', 'تمام']],
      ['ar-QM', ['كيف', 'حالك']],
      ['ar-SA', ['كيف', 'حالك', 'كل', 'شيء', 'طيب']],
      ['ar-SD', ['كيف', 'حالك', 'أخبارك', 'شنو']],
      ['ar-SY', ['كيفك', 'كيف', 'الدنيا', 'معك']],
      ['ar-TN', ['شنو', 'حوالك', 'كل', 'شيء', 'بخير']],
      ['ar-YE', ['كيف', 'حالك', 'أخبارك']],
      ['bg-BG', ['Как', 'си', 'Всичко', 'наред', 'ли']],
      ['cs-CZ', ['Ahoj', 'jak', 'se', 'máš']],
      ['da-DK', ['Hej', 'hvordan', 'går', 'det']],
      ['de-DE', ['Hallo', 'wie', "geht's", 'dir']],
      ['el-GR', ['Γεια', 'σου', 'τι', 'κάνεις']],
      ['en-AU', ["G'day", 'how', 'are', 'you', 'going']],
      ['en-GB', ['Hello', 'how', 'are', 'you', 'doing']],
      ['en-HK', ['Hi', "how's", 'it', 'going']],
      ['en-IN', ['Namaste', 'how', 'are', 'you']],
      ['en-NZ', ['Kia', 'ora', 'how', 'are', 'you']],
      ['en-US', ['Hey', "how's", 'it', 'going']],
      ['en-ZA', ['Howzit', 'how', 'are', 'you']],
      ['en-ZM', ['Hi', 'how', 'are', 'you', 'doing']],
      ['es-ES', ['Hola', '¿cómo', 'estás']],
      ['fa-IR', ['سلام', 'حالت', 'چطوره']],
      ['fr-FR', ['Bonjour', 'comment', 'allez-vous']],
      ['he', ['שלום', 'מה', 'שלומך']],
      ['hu-HU', ['Szia', 'hogy', 'vagy']],
      ['it-IT', ['Ciao', 'come', 'stai']],
      ['ku-IQ', ['سڵاو', 'چۆنی']],
      ['nb-NO', ['Hei', 'hvordan', 'går', 'det']],
      ['nl-NL', ['Hallo', 'hoe', 'gaat', 'het']],
      ['nn-NO', ['Hei', 'korleis', 'går', 'det']],
      ['pl-PL', ['Cześć', 'jak', 'się', 'masz']],
      ['pt-BR', ['Oi', 'tudo', 'bem']],
      ['pt-PT', ['Olá', 'como', 'estás']],
      ['ru-RU', ['Привет', 'как', 'дела']],
      ['sl-SI', ['Živjo', 'kako', 'si']],
      ['sk-SK', ['Ahoj', 'ako', 'sa', 'máš']],
      ['sr-RS', ['Здраво', 'како', 'си']],
      ['sr-RS@latin', ['Zdravo', 'kako', 'si']],
      ['sv-SE', ['Hej', 'hur', 'mår', 'du']],
      ['tr-TR', ['Merhaba', 'nasılsınız']],
      ['uk-UA', ['Привіт', 'як', 'справи']],
    ])

    // ACT
    // ASSERT
    strings.forEach((value, key) => {
      const validated = validate(value, key)
      expect(validated).toStrictEqual(value)
    })
  })

})

function hex(input: string): string {
  const hexStr = Buffer.from(input, 'utf8').toString('hex')
  // split hex string into pairs of two
  const hexPairs = hexStr.match(/.{1,2}/g)
  if (hexPairs) {
    // prepend '0x' to each pair
    hexPairs.forEach((pair, index) => {
      hexPairs[index] = '0x' + pair
    })
    // join pairs with a space
    return input + ' - ' + hexPairs.join(' ')
  }
  return input + ' - ';
}

describe('normalise', () => {
  it('should decompose Amélie to Amélie', () => {
    // ARRANGE
    const input = ['Amélie'];
    const expected = ['Amélie'];
    // ACT
    const result = normalise(input);
    // ASSERT
    console.log({
      input: hex(input[0]),
      expect: hex(expected[0]),
      result: hex(result[0])
    })
    expect(result).toStrictEqual(expected);
  });

  it('\u01F2 should remain \u01F2', () => {
    // ARRANGE
    // Using https://www.unicode.org/Public/13.0.0/ucd/UnicodeData.txt
    const input = ['\u01F2'];
    const expected = ['\u01F2'];
    // ACT
    const result = normalise(input);
    // ASSERT
    console.log({
      input: hex(input[0]),
      expect: hex(expected[0]),
      result: hex(result[0])
    })
    expect(result).toStrictEqual(expected);
  });

  it('Ngāti Rangiwewehi should be canonicalised to Ngāti Rangiwewehi', () => {
    // ARRANGE
    // Using https://www.unicode.org/Public/13.0.0/ucd/UnicodeData.txt
    const input = ['Ngāti Rangiwewehi'];
    const expected = ['Ngāti Rangiwewehi'];
    // ACT
    const result = normalise(input);
    // ASSERT
    console.log({
      input: hex(input[0]),
      expect: hex(expected[0]),
      result: hex(result[0])
    })
    expect(result).toStrictEqual(expected);
  });
})
