# @readachangelog/cli

Keep a changelog? Read a changelog.

## Background

Ever wanted to read a CHANGELOG.md? Sure, we've all been there. But have you tried doing it from a terminal? Yikes.

This project is intended to make that easier by providing a CLI tool to read a CHANGELOG.md file from any NPM repository package or any registry you've configured in your NPM config (e.g. `.npmrc`). Yep, it should work with private repositories.

This project was thrown together quickly. Expect issues. This is my first CLI utility I've ever built in nodejs and I chose to build it with [khalidx/typescript-cli-starter](https://github.com/khalidx/typescript-cli-starter) to deal with the wiring up of the executable. It was lighter weight than [typescript-template/cli](https://www.npmjs.com/package/@typescript-template/cli).

I am new to `commander` so feedback is apprecaited on how the command could be written better.

## Usage

Install:

```
npm i -g @readachangelog/cli
```

Read the help:

```
readachangelog --help
```

For example:

```
keepachangelog view axios | less
```

Or as JSON:

```
keepachangelog view axios --json | jq .
```

## Contributing & Development

See [contributing.md](docs/contributing/contributing.md) for information on how to develop or contribute to this project.

## Dependencies

What npm packages does this project depend on (and what are the licenses)?

- [@npmcli/config](https://www.npmjs.com/package/@npmcli/config) (ISC)
- [changelog-parser](https://www.npmjs.com/package/changelog-parser) (ISC)
- [commander](https://www.npmjs.com/package/commander) (MIT)
- [pacote](https://www.npmjs.com/package/pacote) (ISC)
- [semver](https://www.npmjs.com/package/semver) (ISC)
