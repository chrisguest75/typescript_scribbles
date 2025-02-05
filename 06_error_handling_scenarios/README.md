# README

Demonstrates 06_error_handling_scenarios

NOTES:

* Supports dual cjs and esm package.

## How to run

```sh
just nix
just install
# or
nvm use
npm install

# use typescript compiler
npm run tsc -- --version  

# run targets
npm run test
npm run lint
npm run publint
```

## Publish

```sh
just publish
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

