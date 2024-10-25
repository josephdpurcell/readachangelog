# @readachangelog/cli

Keep a changelog? Read a changelog.

## Background

Ever wanted to read a CHANGELOG.md? Sure, we've all been there. But have you tried doing it from a terminal? Yikes.

This project is intended to make that easier by providing a CLI tool to read a CHANGELOG.md file from any NPM repository package or any registry you've configured in your NPM config (e.g. `.npmrc`). Yep, it should work with private repositories.

This project was thrown together quickly. Expect issues. This is my first CLI utility I've ever built in nodejs and I chose to build it with [khalidx/typescript-cli-starter](https://github.com/khalidx/typescript-cli-starter) to deal with the wiring up of the executable. It was lighter weight than [typescript-template/cli](https://www.npmjs.com/package/@typescript-template/cli).

I am new to `commander` so feedback is apprecaited on how the command could be written better.

## Limitations

The CHANGELOG.md file is parsed using `changelog-parser` and matches are checked using `semver.satisfies`. Because of this you may not get certain changelogs in the reporting. For example, a version like `1.7.0-beta.2` will not get printed using the "outdated" command nor in some cases when using "view" with the "--version" flag.

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

Woah, you can get a full report of outdated modules? Yea, you sure can. Check this out:

```
keepachangelog outdated > outdated-module-report.md
```

Then open up that md file and enjoy. You can also use `--json` to get JSON format.

## Examples

Look at the help output.

Also look at example reports: [docs/example-reports/](docs/example-reports/).

## Contributing & Development

See [contributing.md](docs/contributing/contributing.md) for information on how to develop or contribute to this project.

## Dependencies

What npm packages does this project depend on (and what are the licenses)?

- [@npmcli/config](https://www.npmjs.com/package/@npmcli/config) (ISC)
- [changelog-parser](https://www.npmjs.com/package/changelog-parser) (ISC)
- [commander](https://www.npmjs.com/package/commander) (MIT)
- [pacote](https://www.npmjs.com/package/pacote) (ISC)
- [semver](https://www.npmjs.com/package/semver) (ISC)
