# How does the changelog lookup work?

Skipping over the logic to fetch the package and download it into the cache directory, let's just focus on file match.

## File Matching

In the downloaded package the files are found according to this logic:

1. List all the files in the root of the extracted package
2. For each file found, lowercase the file name and pick the first one that matches in this order:

   1. `changelog.md` - We do a straight check so that conventional packages are fast.
   1. `^changelog(\.md|\.[a-z_-]*\.md|\.markdown|)$` - Then we do a longer check for variations on the "CHANGELOG.md".
   1. `^changes(|\.md|\.markdown)$` - Some use "changes", which is closer to "CHANGELOG.md" than the rest so look for these next.
   1. `^history(|\.md|\.markdown)$` - [Keep a Changelog](https://keepachangelog.com/) mentions this.
   1. `release-notes.md` - I was surprised, but there are popular packages using this file name, see `diff` and `handlebars`.
   1. `releasenotes.md` - Only the `chai` package was using it but this is one of those things where just because only 1 of the top 1,000 from 2019 doesn't mean there isn't a long tail of other packages using it too.

The above list was formed by downloading the top 1,000 NPM packages and looking through what files exist in the root of the projects. The list chosen was from https://gist.github.com/anvaka/8e8fa57c7ee1350e3491, specifically the August 2019 list of most dependend-upon packages. I did a case-insensitive searched for files matching `*.md`,`*change*`, `*release`, and `*history*` in the root of the projects. Then I gave them a score: the files that showed in more packages got a higher score and it got a higher score if it was a `.md` file. Based on that I eliminated files that either by glancing at the name or by inspecting the file contents weren't actually changelogs and crafted the above pattern matching logic. See also [src/test-files/package-files-with-score.json](https://github.com/josephdpurcell/readachangelog/tree/main/src/test-files/package-files-with-score.json).

The file names "NEWS" and "RELEASES" are not included even though Keep a Changelog mentions them. The NEWS file seems to be a format that wouldn't be able to be parsed. I don't know where "RELEASES" file name convention came from.

### Notes

Here are some interesting notes:

- There is a file called `changes` in the `canvas` package appears to be accidental. Its not a proper changelog. But, the `cli-color` project has a file `CHANGES` that is a proper changelog. Even though it was only two examples I decided to include it.
- Some people are using the ".markdown" file extension so I included that.
- Some make use of Markdown frontmatter like `jszip` package has a `CHANGES.md` file with `title`, `layout`, and `section`. Perhaps that's used to help render the content, e.g. with jekyl.
- `element-ui` has no `CHANGELOG.md`, instead it is `CHANGELOG.{lang}.md`. This is interesting and I don't see a standard for it (see [common-changelog issue #17](https://github.com/vweevers/common-changelog/issues/17)).
