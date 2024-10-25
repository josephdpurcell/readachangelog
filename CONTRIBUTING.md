# Contributing

Primary ways to contribute:

1. Report back how you're using this CLI in Discussions, including feature requests
2. Adding tests
3. Submitting PRs

## TODOs

Here are some top TODOs I would like:

- Is there a better way to handle the cache dir? I think ideally I would want it to leverage npm's own cache directory, but I don't want to somehow conflict with its state.
- Can this work with other package managers, yarn, etc?
- Run tests on pipeline
- Is `changelog-parser` the best choice? There are a few options and it seemed like the most used. Not sure how well its going to work for scenarios that don't match the tests.
- Tidy up the command... apparently you can pass extra arguments? And I originally designed it to be `readachangelog [modulespec] [versionOrDate]` but I couldn't figure out how to get optional arguments to work

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

Build:

```
npm run build
```

See what's going to be published:

```
npm pack --dry-run
```

Publish:

```
npm publish --access public
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
