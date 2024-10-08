# TYPESCRIPT SCRIBBLES

A little place I can put down and test little typescript ideas.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org) [![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit)](https://github.com/pre-commit/pre-commit)

## Conventional Commits

NOTE: This repo has switched to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0). It requires `pre-commit` and `commitizen` to help with controlling this.

```sh
# install pre-commmit (prerequisite for commitizen)
brew install pre-commit
brew install commitizen
# conventional commits extension
code --install-extension vivaxy.vscode-conventional-commits

# install hooks
pre-commit install --hook-type commit-msg --hook-type pre-push
```

## Resources

- TypeScript is JavaScript with syntax for types. [here](https://www.typescriptlang.org/)
- Collection of TypeScript type challenges [here](https://github.com/type-challenges/type-challenges)
- TypeScript's largest utility library [here](https://github.com/millsp/ts-toolbelt)
- Collection of utility types, complementing TypeScript built-in mapped types and aliases (think "lodash" for static types). [here](https://github.com/piotrwitek/utility-types)
- Yet another typing library. This differs by aiming to be less experimental than others, driven by industry use cases. [here](https://github.com/andnp/SimplyTyped)
