# Contributing

Primary ways to contribute:

1. Report back how you're using this CLI in Discussions, including feature requests
2. Adding tests
3. Submitting PRs

## TODOs

Here are some top TODOs I would like:

- Read a changelog from a URL or from local filesystem.
- Merge some of the functionality from https://www.npmjs.com/package/changelog into here so that if a project is public and doesn't have a CHANGELOG.md it could be auto generated. Perhaps this could be expanded to say "any package that has a repository specified we can generate a changelog for". This would be especially useful for outdated.
- Format "raw" should probably be "md" since its Markdown. The reason I used "raw" was because its the "raw" file and coincidentally the content is Markdown. There are various changelog formats and I think the only ones supported right now are Markdown so "raw" and "md" formats are the same. Something to consider if other formats are supported in the future.
- Can this project take cues from say [check-outdated](https://github.com/jens-duttke/check-outdated)? I like how dependencies and devDependencies are separated and then color legend for major/minor/patch/reverted. Not sure how that would translate to the JSON/RAW format.
- Is performance a concern? I'm running it fine.
- Should toc be added to "view" as well? Some changelogs are large.
- Is there a better way to handle the cache dir? I think ideally I would want it to leverage npm's own cache directory, but I don't want to somehow conflict with its state. Maybe theres a way to just stream-read from the NPM cache dir directly because I think pacote will always download the package anyway?
- Can this work with other package managers, yarn, etc?
- How can `COMMAND_VERSION` automatically get set from package.json?
- Run tests on pipeline
- Is `changelog-parser` the best choice? There are a few options and it seemed like the most used. Not sure how well its going to work for scenarios that don't match the tests. Perhaps that dependency should just be deprecated in favor of copying the code into here, see [parseChangelog()](https://github.com/ungoldman/changelog-parser/blob/main/index.js#L23).
- Tidy up the command... apparently you can pass extra arguments? And I originally designed it to be `readachangelog [modulespec] [versionOrDate]` but I couldn't figure out how to get optional arguments to work
- Add other fitlers to outdated command, e.g. filter by name.

## Development

### **dev**

`npm run dev`

Runs the CLI application.

You can pass arguments to your application by running `npm run dev -- --your-argument`. The extra `--` is so that your arguments are passed to your CLI application, and not `npm`.

### **clean**

`npm run clean`

Removes any built code and any built executables.

### **build**

`npm run build`

Cleans, then builds the TypeScript code.

Your built code will be in the `./dist/` directory.

### **test**

`npm run test`

Cleans, then builds, and tests the built code.

### **bundle**

`npm run bundle`

Cleans, then builds, then bundles into native executables for Windows, Mac, and Linux.

Your shareable executables will be in the `./exec/` directory.

## Publishing

Get added to the `readachangelog` org.

Update `package.json` version and `COMMAND_VERSION` in `dto.ts`.

Run helper command to build and publish:

```
npm run pub
```

Note: the pub command requires `jq` because I keep forgetting to bump the version and so I added a lil helper.

Tip: see what's going to be published:

```
npm pack --dry-run
```

## How was this project setup?

Just in case I need to do this again I started with the template [khalidx/typescript-cli-starter](https://github.com/khalidx/typescript-cli-starter) and then:

- Modified package.json `private: false` because it kept failing on trying to publish private
- Changed package.json to have `"bin": { "readachangelog": "./dist/cli.js" }`
- `npm i -D eslint-config-love` then added `eslint.config.js` per https://www.npmjs.com/package/eslint-config-love, but then had to refactor it to use `module.exports = {}` syntax
- Added `"type": "module"` to package.json to get eslint to work
- Modified `tsconfig.json`:
  - `"strictPropertyInitialization": false,`
  - `"useUnknownInCatchVariables": false,`
  - `"strictNullChecks": true,`
- I did away w ava since I'm not familiar and used jest
- Everything was SUPER outdated; commander was v2 and latest v12
