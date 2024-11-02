# @readachangelog/cli

Keep a changelog? Read a changelog.

## Background

Ever wanted to read a CHANGELOG.md? Sure, we've all been there. But have you tried doing it from a terminal for a bunch of packages? Yikes.

This project is intended to make that easier by providing a CLI tool to read a CHANGELOG.md file from any NPM repository package or any registry you've configured in your NPM config (e.g. `.npmrc`). Yep, it should work with private repositories.

This project was thrown together quickly. Expect issues. This is my first CLI utility I've ever built in nodejs and I chose to build it with [khalidx/typescript-cli-starter](https://github.com/khalidx/typescript-cli-starter) to deal with the wiring up of the executable. It was lighter weight than [typescript-template/cli](https://www.npmjs.com/package/@typescript-template/cli).

I am new to `commander` so feedback is apprecaited on how the command could be written better.

## Limitations

**Changelog Source**

The changelog must be published to an [NPM repository](https://www.npmjs.com/), private registries are supported as long as your NPM installation is configured. The changelog content cannot be read from commit messages. The opinion of this package is that commit messages are immutable and serve a different purpose than a change log. Said differently, there is important information you may want to include in your changelog that would not be found in commits, and there is information in commits that is not relevant for a changelog. Also, the changelog content cannot be read from GitHub release pages. The opinion of this package is that a GitHub release page is just a vendor specific changelog and we want to use the universally supported changelog, a.k.a. CHANGELOG.md. People can still generate their changelog information from commits or GitHub pages using the various tools that accomplish this.

**Changelog File Format**

The file name must be `CHANGELOG.md` in the root of the published package. NPM does not publish this file by default, so you will need to include it. Because there are so many projects that do not use `CHANGELOG.md` this project does extra logic to accommodate unconventional file names, see [lookup.md](https://github.com/josephdpurcell/readachangelog/tree/main/docs/lookup.md).

**Changelog Content Format**

This project is not intending to tackle what is the proper changelog format but rather ensure it leverages a changelog parser that performs well. This project uses [changelog-parser](https://www.npmjs.com/package/changelog-parser) so any changelog that can be parsed by it can be parsed by this project. You can read more detail on [parsing.md](https://github.com/josephdpurcell/readachangelog/tree/main/docs/parsing.md). If you are looking for a recommendation I suggest following [Common Changelog](https://common-changelog.org/), it seems to be a reasonable standard.

**Changelog Section Filtering**

This project filters sections of the changelog. For the outdated command and with the view command's `--version` filter it will do matches using `semver.satisfies`. Because of this you may not get certain changelogs in the reporting. For example, a version like `1.7.0-beta.2` may not get printed. The view command's `--date` filter is just a "starts with" match. Both the version and date will only be detected if it follows the content format required by `changelog-parser`.

## Alternatives

I'll do my best to capture alternatives that are in this same category of "changelog" tools.

There's an entire category of "keep a changelog" tools which help you author changelogs. These include [changelog](https://www.npmjs.com/package/changelog), [keep-a-changelog](https://www.npmjs.com/package/keep-a-changelog), [semantic-release](https://www.npmjs.com/package/semantic-release), [conventional-changelog](https://github.com/conventional-changelog), and [release-please](https://www.npmjs.com/package/release-please). I'm sure there are more. They all seem to be limited togeneration of a changelog information by reading commit messages. And some (if not all?) are limited to commit messages on public GitHub repositories.

Separate from that category are "read a changelog" tools that help you read changelogs. This is the category that `readachangelog` fits in. The only alternative I found was [npm-fetch-changelog](https://www.npmjs.com/package/npm-fetch-changelog). It only works with GitHub packages and supports reading release pages for tags but then uses the CHANGELOG.md or changelog.md file as a backup.

And separate from that category are "parse a changelog" tool which I cover in [parsing.md](https://github.com/josephdpurcell/readachangelog/tree/main/docs/parsing.md).

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

Then open up that md file and enjoy. You can also use `--format=json` to get JSON format and even filter by NPM scope like `--filter-scope=@google-cloud`.

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
