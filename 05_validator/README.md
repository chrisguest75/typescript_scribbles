# README

Validator for words

NOTES:

* Trim words
* Do not allow words with more than two punctuation marks

TODO:

* Detect locale of a word then validate against it.

## Run tests

```sh
nvm use
npm install

just test

just test  -- --watch src/validate.test.ts
```

## Normalisation

* Normalization Form D (NFD) - Canonical Decomposition
* Normalization Form C (NFC) - Canonical Decomposition, followed by Canonical Composition
* Normalization Form KD (NFKD) - Compatibility Decomposition
* Normalization Form KC (NFKC) - Compatibility Decomposition,followed by Canonical Composition

## Resources

- A library of string validators and sanitizers [here](https://www.npmjs.com/package/validator)
- Unicode Normalization Forms [here](https://unicode.org/reports/tr15/)
- https://en.wikipedia.org/wiki/Unicode_equivalence
- https://medium.com/swlh/unicode-string-comparisons-and-compositions-many-forms-same-meaning-775487f5d76c
- https://www.unicode.org/Public/13.0.0/ucd/UnicodeData.txt