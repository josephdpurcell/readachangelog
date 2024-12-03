import { Command } from "commander";
import { parseAsInt } from "./cli.utility";
import { ViewCommand } from "./command.view.class";
import { ViewCommandInputArguments } from "./command.view.dto";
import { COMMAND_NAME, DEFAULT_CACHE_DIR, EXIT_CODE_FAILURE } from "./dto";
import { ReadachangelogUtility } from "./lib";

export function initViewCommand(program: Command) {
  program
    .command("view")
    .description(
      `View a CHANGELOG.md for a given package spec published to any NPM registry and optionally filter content to a version or date`
    )
    .argument(
      "<package_spec>",
      "The spec of a package you want to read the changelog from; anything you could pass to npm install can be passed here"
    )
    .option(
      "--version <spec>",
      "Filter changelog content to a given semver spec, e.g. 1.0.0 or >=1.0.0. If used with date, version takes priority."
    )
    .option(
      "--date <date>",
      "Filter changelog content to a given date or date wildcard. If used with version, version takes priority."
    )
    .option(
      "--limit <number>",
      "Filter changelog content the most recent number of entries",
      parseAsInt
    )
    .option("--format <format>", "Output format as json or raw", "raw")
    .option(
      "--cacheDir <dir>",
      "Cache directory when percote downloads packages",
      DEFAULT_CACHE_DIR
    )
    .addHelpText(
      "after",
      `
Examples:
  Print the full CHANGELOG.md in the latest version of the package:

    ${COMMAND_NAME} view package

    OR as JSON:

    ${COMMAND_NAME} view package --format=json

  Print the full CHANGELOG.md in the 1.0.0 version of the package:

    ${COMMAND_NAME} view package@1.0.0

  Print the full CHANGELOG.md in the latest version of the package, filtered down to a date:

    ${COMMAND_NAME} view package --date='1970-01-01'

    OR the entire month of January:

    ${COMMAND_NAME} view package --date='1970-01-*'

    OR the entire year of 1970:

    ${COMMAND_NAME} view package --date='1970-*'

  Print the full CHANGELOG.md in the latest version of the package, filtered down to a version:

    ${COMMAND_NAME} view package 1.0.0

    OR the semver range of 1.0.0 through the latest:

    ${COMMAND_NAME} view package >=1.0.0

  Print only the latest entry in the CHANGELOG.md in the latest version of the package:

    ${COMMAND_NAME} view package --limit=1
`
    )
    .action(
      async (package_spec: string, options: ViewCommandInputArguments) => {
        try {
          const viewCommand = new ViewCommand({
            lookupOptions: {
              cacheDir: options.cacheDir,
            },
          });
          const versionOrDateInput = options.version || options.date;
          const versionOrDate =
            ReadachangelogUtility.parseVersionOrDate(versionOrDateInput);

          await viewCommand.run({
            packageSpec: package_spec,
            versionOrDate: versionOrDate,
            outputFormat: options.format,
            limit: options.limit,
          });
        } catch (e) {
          if (e instanceof Error) {
            console.error(`ERROR: ${e.message}`);
          }
          process.exit(EXIT_CODE_FAILURE);
        }
      }
    );
}
