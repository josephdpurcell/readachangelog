# @readachangelog/cli

Keep a changelog? Read a changelog.

## Background

Ever wanted to read a CHANGELOG.md? Sure, we've all been there. But have you tried doing it from a terminal? Yikes.

This project is intended to make that easier by providing a CLI tool to read a CHANGELOG.md file from any NPM repository package or any registry you've configured in your NPM config (e.g. `.npmrc`). Yep, it should work with private repositories.

This project was thrown together quickly. Expect issues. This is my first CLI utility I've ever built in nodejs and I chose to build it with [khalidx/typescript-cli-starter](https://github.com/khalidx/typescript-cli-starter) to deal with the wiring up of the executable. It was lighter weight than [typescript-template/cli](https://www.npmjs.com/package/@typescript-template/cli).

## Usage

Install:

```
npm i -g @readachangelog/cli
```

Profit:

```
readachangelog --help
```

## Contributing & Development

See [contributing.md](docs/contributing/contributing.md) for information on how to develop or contribute to this project.

## Dependencies

- [changelog-parser](https://www.npmjs.com/package/changelog-parser) ISC
- [@npmcli/config](https://www.npmjs.com/package/@npmcli/config) ISC
- [pacote](https://www.npmjs.com/package/pacote) ISC
- [semver](https://www.npmjs.com/package/semver) ISC

Template for this project built with [typescript-template/cli](https://www.npmjs.com/package/@typescript-template/cli) MIT.

## Notes for the Teamplate

- Modified package.json `private: false` because it kept failing on trying to publish private
- Modified scripts/publish to have `npm publish --access public` because it kept failing on trying to publish private
- Have to run tests via `npm run test`, hopefully there is some way to do this with VSCode so you can quickly run a specific test
- I was initially confused on `scripts/` vs `src/bin/`. It makes sense now.
