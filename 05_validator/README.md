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

## Resources

- A library of string validators and sanitizers [here](https://www.npmjs.com/package/validator)
- Unicode Normalization Forms [here](https://unicode.org/reports/tr15/)
- https://en.wikipedia.org/wiki/Unicode_equivalence