# README

Demonstrates Zod functionality.

TODO:

- Runtime and compile time.

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

- https://www.reddit.com/r/typescript/comments/10f8kah/is_using_zod_as_the_primary_source_of_truth_for/
