import { Command } from "commander";
import { OutdatedCommand } from "./command.outdated.class";
import { OutdatedCommandInputArguments } from "./command.outdated.dto";
import { COMMAND_NAME, DEFAULT_CACHE_DIR, EXIT_CODE_FAILURE } from "./dto";

export function initOutdatedCommand(program: Command) {
  program
    .command("outdated")
    .description(
      `View the CHANGELOG.md from your installed outdated version to the latest`
    )
    .option(
      "--no-header",
      "Do not add the header, only applies with raw format"
    )
    .option("--no-toc", "Do not add the TOC, only applies with raw format")
    .option("--format <format>", "Output format as json or raw", "raw")
    .option(
      "--filter-scope <scope>",
      "Filter packages to only those with scope"
    )
    .option(
      "--cacheDir <dir>",
      "Cache directory when percote downloads packages",
      DEFAULT_CACHE_DIR
    )
    .addHelpText(
      "after",
      `
Examples:
  Print all outdated packages:

    ${COMMAND_NAME} outdated

    OR as JSON:

    ${COMMAND_NAME} outdated --format=json

  Print all outdated packages but don't have a table of contents (toc):

    ${COMMAND_NAME} outdated --no-toc
`
    )
    .action(async (options: OutdatedCommandInputArguments) => {
      try {
        const command = new OutdatedCommand({
          lookupOptions: {
            cacheDir: options.cacheDir,
          },
        });
        const filter = options.filterScope
          ? { scope: options.filterScope }
          : undefined;

        command.run({
          outputFormat: options.format,
          // This is so wild to me. See "Other option types, negatable boolean and boolean|value" onhttps://www.npmjs.com/package/commander.
          // Passing --no-toc results on toc: false. And if your default is false on the option then you can never get to true.
          // The way you get to true is having --no-toc with no default, and then options.toc will be true if --no-toc is not passed.
          // Makes sense when you know it.
          toc: options.toc,
          // Header works the same as toc
          header: options.header,
          filter: filter,
        });
      } catch (e) {
        if (e instanceof Error) {
          console.error(`ERROR: ${e.message}`);
        }
        process.exit(EXIT_CODE_FAILURE);
      }
    });
}
