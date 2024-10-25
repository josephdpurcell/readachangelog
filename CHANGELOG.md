# Changelog

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
