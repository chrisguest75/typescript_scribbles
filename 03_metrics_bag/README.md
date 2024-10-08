# README

Demonstrates 03_metrics_bag

TODO:

- performance
- add labels to metrics bag and labels to individual metrics.
- I don't like that I have to cast in the client and check types in the getMetrics.
- https://typedoc.org/guides/plugins/

## Supports

- A timestamp that can be used for measuring deltas
- A counter incrementing only
- A value metric type with max and min value configuration to retain highest and lowest values.
- A metric bag class that can also be configured using a factory.

## How to run

```sh
nvm use
npm install

# use typescript compiler
npm run tsc -- --version

# run targets
npm run start:dev
npm run test
npm run test:coverage
npm run lint

# docker build
npm run docker:build
npm run docker:run


# run all tests
just local-test-pipeline
```

## Run an example

```sh
npm run start -- --time 20000
```

## Build docs

```sh
npm run docs:serve
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

- My basic typecript cmdline [01_basic_cmdline](https://github.com/chrisguest75/typescript_examples/tree/master/01_basic_cmdline)
- ts-jest ESM Support [here](https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/#support-mts-extension)

- Chainguard LTS images [here](https://images.chainguard.dev/directory/image/node-lts/versions)
- Node prune [here](https://github.com/tj/node-prune/tree/master)

- https://typedoc.org/guides/plugins/
- https://tsdoc.org/