# README

Demonstrates Zod functionality [zod.dev](https://zod.dev/).

TODO:

- Runtime and compile time.
- versioned schemas - https://www.jcore.io/articles/schema-versioning-with-zod
- validate any object with zod
- Build out complex objects with zod

## Demonstrates

- Loading JSON files off disk and validating them against a Zod schema
- Different Zod types
- Strict checking

## How to run

```sh
nvm use
npm install

# use typescript compiler
npm run tsc -- --version

# run targets
npm run start:dev
npm run test
npm run lint

# docker build
npm run docker:build
npm run docker:run

# run all tests
just local-test-pipeline
```

## Examples

```sh
npm run start -- --jsonPath './tests/testdata/valid_config.json'
npm run start -- --jsonPath './tests/testdata/valid_config.json' --schema simple


npm run start -- --jsonPath './tests/testdata/invalid_config_missing_fields.json' --schema simple
npm run start -- --jsonPath './tests/testdata/invalid_config_extra_fields.json' --schema strict

npm run start -- --jsonPath './tests/testdata/nested_schema.json' --schema nested
```

## Debugging

Ensure that the sourcemap output is enabled.

```json
  "sourceMap": true,
```

Open `vscode` in the correct directory.

```sh
# you must be in the code directory and not in the git root
cd ./xx_project_name
nvm install

# if the code is built it will use the version in here to debug
npm run clean
code .
```

1. Select `./src/index.ts` and put a breakpoint on the log line.
2. Click the debug icon. Click on create a `launch.json` and select `node.js` NOTE: If you select Run and Debug it will fail because the code is not built.
3. Click the debug icon again and then drop down the selection to select node.js and select a target of "start:dev"

The code should break on the breakpoint.

## Resources

- TypeScript-first schema validation with static type inference [here](https://zod.dev/)
- validator.js - A library of string validators and sanitizers. [here](https://github.com/validatorjs/validator.js)
- Is using zod as the primary source of truth for Typescript types sensible/sustainable? [here](https://www.reddit.com/r/typescript/comments/10f8kah/is_using_zod_as_the_primary_source_of_truth_for/)
- json-to-zod [here](https://transform.tools/json-to-zod)
- Get safer TypeScript code with Zod: a practical guide [here](https://testdouble.com/insights/type-safety-at-runtime-with-zod)
- Schema Versioning with Zod [here](https://www.jcore.io/articles/schema-versioning-with-zod)
