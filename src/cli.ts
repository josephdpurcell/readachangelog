#!/usr/bin/env node

import { Command, InvalidArgumentError } from "commander";
import { ViewCommand } from "./command.view";
import { COMMAND_NAME, COMMAND_VERSION, EXIT_CODE_FAILURE } from "./dto";
import { ReadachangelogUtility } from "./lib";

const program = new Command();

class ViewOptions {
  version?: string;
  date?: string;
  limit?: number;
  // Options that have defaults are always set:
  format: "raw" | "json";
  cacheDir: string;
}

function parseAsInt(value, dummyPrevious) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError("Not a number.");
  }
  return parsedValue;
}

program
  .name(COMMAND_NAME)
  .version(COMMAND_VERSION)
  .description("Keep a changelog? Read a changelog.");

program
  .command("view")
  .description(
    `Description:
  View a CHANGELOG.md for a given package spec published to any NPM registry and optionally filter content to a version or date`
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
    "/tmp"
  )
  .addHelpText(
    "after",
    `
Examples:
  Print the full CHANGELOG.md in the latest version of the package:

    ${COMMAND_NAME} package

    OR as JSON:

    ${COMMAND_NAME} package --format=json

  Print the full CHANGELOG.md in the 1.0.0 version of the package:

    ${COMMAND_NAME} package@1.0.0

  Print the full CHANGELOG.md in the latest version of the package, filtered down to a date:

    ${COMMAND_NAME} package --date='1970-01-01'

    OR the entire month of January:

    ${COMMAND_NAME} package --date='1970-01-*'

    OR the entire year of 1970:

    ${COMMAND_NAME} package --date='1970-*'

  Print the full CHANGELOG.md in the latest version of the package, filtered down to a version:

    ${COMMAND_NAME} package 1.0.0

    OR the semver range of 1.0.0 through the latest:

    ${COMMAND_NAME} package >=1.0.0

  Print only the latest entry in the CHANGELOG.md in the latest version of the package:

    ${COMMAND_NAME} package --limit=1
`
  )
  .action(async (package_spec: string, options: ViewOptions) => {
    try {
      const viewCommand = new ViewCommand({
        lookupOptions: {
          cacheDir: options.cacheDir,
        },
      });
      const versionOrDateInput = options.version || options.date;
      const versionOrDate =
        ReadachangelogUtility.parseVersionOrDate(versionOrDateInput);

      viewCommand.run({
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
  });

program.parse();
