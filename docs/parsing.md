# Parsing Changelogs

This page focuses on the parsing of a changelog. What SHOULD be able to be parsed by this project?

There are no shortage of opinions on CHANGELOG.md format, including filename. See [Keep a Changelog](https://keepachangelog.com/) and [Common Changelog](https://common-changelog.org/). Let's consider what spec should be used as out of scope for this analysis and say the focus should be on finding the right parser package.

There are quite a few parsing packages, here are a few:

- @jayree/changelog
- @release-notes/changelog-parser
- cclog-parser
- changelog-parser
- changelog-utils
- chlog-tool
- git-changelog-parser
- pear-changelog

This project uses [changelog-parser](https://www.npmjs.com/package/changelog-parser). Should it? Is there another project that performs better?

Well I did two eyeball tests to see if there were glaring issues.

## Test 1: Can changelog-parser parse the test files from the other projects?

I did a quick check by downloading the test markdown files for each of the similar packages I listed above just to see if `changelog-parser` performed well on them. Here's what I saw: below is the package name and then the name of the test file from that package and then the number of versions found:

```
cclog-parser/conventionalcommits.md 16
cclog-parser/converntional_changelog2.md 58
cclog-parser/empty.md 0
cclog-parser/karma.md 40
cclog-parser/simple.md 1
@jayree/changelog/notes.md 5
git-changelog-parser/History.md 2
keep-a-changelog/changelog.custom.type.md 3
keep-a-changelog/changelog.expected.linted.md 14
keep-a-changelog/changelog.expected.md 14
keep-a-changelog/changelog.gitlab.md 3
keep-a-changelog/changelog.md 14
keep-a-changelog/empty.expected.md 0
```

At first glance I think `changelog-parser` is performing fine. I didn't dig into each test and make sure all the data is getting parsed.

## Test 2: How well does it do against the top 1,000 NPM packages?

For some background here go read the [lookup.md](https://github.com/josephdpurcell/readachangelog/tree/main/docs/lookup.md). I'm using the same package list here.

I wrote a quick bash script to run the test. This doesn't check ALL the file names that `readachangelog` would check but it's still a great sample set.

```bash
#!/bin/bash

echo "\"file\",\"H1\",\"H2\",\"H3\",\"VERSIONS\""
for file in **/*.md
do
    basefile=`basename $file | tr "[:upper:]" "[:lower:]"`
    if [[
        "$basefile" != "changelog.md"
        && "$basefile" != "history.md"
        && "$basefile" != "changes.md"
        && "$basefile" != "release.md"
        && "$basefile" != "release-notes.md"
        && "$basefile" != "changelog.en-us.md"
    ]]
    then
        continue
    fi
    H1=$(cat $file | grep '^#[^#]' | wc -l | tr -d '[:blank:]')
    H2=$(cat $file | grep '^##[^#]' | wc -l | tr -d '[:blank:]')
    H3=$(cat $file | grep '^###[^#]' | wc -l | tr -d '[:blank:]')
    VERSIONS=$(changelog-parser $file | jq '.versions | length')
    echo "\"$file\",\"$H1\",\"$H2\",\"$H3\",\"$VERSIONS\""
done
```

Looking at the reults there were 271 files. Of those, the number of versions exactly matched the number of 2nd level headings. The remaining 53 files had the number of versions exactly match the number of 1st plus 2nd level headings. This seems uncanny to get 100% accuracy.

Again, I didn't dig into to see if the parsed data was correct. I'm just doing an eyeball analysis here.

## Summary

At present I have no reason to go investigate a different parser. It seems to perform well. It seems reasonable to say if data isn't getting parsed by the `changelog-parser` package then the issue lies on the changelog side and the maintainer should correct the format.
