# Changelog

## 1.4.5 - 2024-12-02

- Previous version was too zealous with assumptions, this version correctly knows that sometimes the npm outdated execution will return an error but that can still result in success. Why? Good question.

## 1.4.4 - 2024-12-02

- Ensure Error is used so the message can be logged
- Use exit code 1 on failure instead of 0. What? Yep.

## 1.4.3 - 2024-12-02

- Await within try/catch to avoid unhandled promise exception. Classic.

## 1.4.2 - 2024-10-26

- Add analysis about parsing performance for changelog-parser

## 1.4.1

- Fix version because NPM didn't pick it up for some reason.
- For outdated command:
  - Add a header to the raw output with a `--no-header` option.
  - Ensure the TOC is only printed if there are contents, otherwise print there are no outdated.

## 1.4.0

- Add `--filter-scope` to the outdated command. This allows you to view only outdated packages within a given NPM scope.

## 1.3.1

- Fix cache. How? How indeed. By only caching what we can, which is exactly 1 scenario: when you specify an exact package version because packages are immutable. All other cases will pull from NPM which will use its own cache if it exists so this is still performant for the cases I've tested.

## 1.3.0

- Add broader changelog name checks, see [lookup.md](https://github.com/josephdpurcell/readachangelog/tree/main/docs/lookup.md).
- Properly add CHANGELOG.md to NPM package. I see why this is a problem.

## 1.2.7

- Accidentally published 1.2.7 instead of 1.3.0

## 1.2.5

- Remove axios dep. (A better way to test this package needs to be made.)
- Add version check on publish

## 1.2.4

- Move default cache dir from `/tmp` to `/tmp/readachangelog/cache`
- Update examples in help output, which were also wrong

## 1.2.3

- Retroactively update CHANGELOG.md, oops. Also hilarious.
- Do not add anchor links when `--no-toc` is given.

## 1.2.2

- Fix version in code, was 1.1.0 and now should be 1.2.2

## 1.2.1

- Fix README instructions which had wrong command name

## 1.2.0

- Add support for table of contents when running outdated with raw format (Markdown); enabled by default and can be disabled like `readachangelog outdated --no-toc`

## 1.1.1

- Fix issue when generating outdated report and no CHANGELOG.md exists for a package. `hasChangelog` property is added.

## 1.1.0

- Add outdated report feature, e.g. `readachangelog outdated`

## 1.0.0

- Initial release with support for viewing a package's changelog, e.g. `readachangelog view axios`

## Changes Prior to 1.0.0

- More testing
- Add initial code
