# @readachangelog/cli

Keep a changelog? Read a changelog.

## Background

Ever wanted to read a CHANGELOG.md? Sure, we've all been there. But have you tried doing it from a terminal for a bunch of packages? Yikes.

This project is intended to make that easier by providing a CLI tool to read a CHANGELOG.md file from any NPM repository package or any registry you've configured in your NPM config (e.g. `.npmrc`). Yep, it should work with private repositories.

This project was thrown together quickly. Expect issues. This is my first CLI utility I've ever built in nodejs and I chose to build it with [khalidx/typescript-cli-starter](https://github.com/khalidx/typescript-cli-starter) to deal with the wiring up of the executable. It was lighter weight than [typescript-template/cli](https://www.npmjs.com/package/@typescript-template/cli).

I am new to `commander` so feedback is apprecaited on how the command could be written better.

## Limitations

There are no shortage of opinions on CHANGELOG.md format, including filename. See [Keep a Changelog](https://keepachangelog.com/) and [Common Changelog](https://common-changelog.org/). This project requires `CHANGELOG.md` to be at the root of the package and is published to the [NPM repository](https://www.npmjs.com/). A LOT of packages do not have this. So, this project does extra logic to accommodate unconventional file names, see [lookup.md](https://github.com/josephdpurcell/readachangelog/tree/main/docs/lookup.md).

This project does not read commit messages or GitHub release pages.

The CHANGELOG.md file is parsed using [changelog-parser](https://www.npmjs.com/package/changelog-parser) and matches are checked using `semver.satisfies`. Because of this you may not get certain changelogs in the reporting. For example, a version like `1.7.0-beta.2` will not get printed using the "outdated" command nor in some cases when using "view" with the "--version" flag.

## Alternatives

I'll do my best to capture alternatives that are in this same category of "changelog" tools.

There's an entire category of "keep a changelog" tools like [changelog](https://www.npmjs.com/package/changelog), [keep-a-changelog](https://www.npmjs.com/package/keep-a-changelog), [semantic-release](https://www.npmjs.com/package/semantic-release), [conventional-changelog](https://github.com/conventional-changelog), and [release-please](https://www.npmjs.com/package/release-please). I'm sure there are more. They all seem to be limited togeneration of a changelog information by reading commit messages. And some (if not all?) are limited to commit messages on public GitHub repositories.

Separate from that category are "read a changelog" tools. The only one I found was [npm-fetch-changelog](https://www.npmjs.com/package/npm-fetch-changelog). It only works with GitHub packages but supports reading release pages for tags and then uses the CHANGELOG.md or changelog.md file as a backup.

## Install

```
npm i -g @readachangelog/cli
```

## Usage

Read the help:

```
readachangelog --help
```

For example:

```
readachangelog view axios | less
```

Or as JSON:

```
readachangelog view axios --format=json | jq .
```

Woah, you can get a full report of outdated modules? Yea, you sure can. Check this out:

```
readachangelog outdated > outdated-module-report.md
```

Then open up that md file and enjoy. You can also use `--format=json` to get JSON format.

## Examples

Look at the help output.

Also look at example reports: [docs/example-reports](https://github.com/josephdpurcell/readachangelog/tree/main/docs/example-reports).

## How it Works

Ok what are the basic bits you'd want to know about how this works?

- It fetches the package using `pacote` which basically just pulls packages using NPM so it leverages NPM's cache and auth and other NPM configs (global/local).
- But, it needs to extract that package to inspect the file. So, we extract to a cache directory owned by this project which by default is `/tmp/readachangelog`. (You can customize this.)
- Once you have the changelog you need to parse it and this project uses [changelog-parser](https://www.npmjs.com/package/changelog-parser).

The rest of the details you can look at the code because open source, eh?

## Contributing & Development

See [contributing.md](https://github.com/josephdpurcell/readachangelog/blob/main/CONTRIBUTING.md) for information on how to develop or contribute to this project.

## Dependencies

What npm packages does this project depend on (and what are the licenses)?

- [@npmcli/config](https://www.npmjs.com/package/@npmcli/config) (ISC)
- [changelog-parser](https://www.npmjs.com/package/changelog-parser) (ISC)
- [commander](https://www.npmjs.com/package/commander) (MIT)
- [pacote](https://www.npmjs.com/package/pacote) (ISC)
- [semver](https://www.npmjs.com/package/semver) (ISC)
