#!/usr/bin/env node

import { Command } from "commander";
import { ChangelogCli } from "./command.view";
import { COMMAND_NAME, COMMAND_VERSION } from "./dto";
import { ChangelogLib } from "./lib";

const program = new Command();

class ViewOptions {
  version?: string;
  date?: string;
  // Options that have defaults are always set:
  format: "raw" | "json";
  cacheDir: string;
}

program
  .name(COMMAND_NAME)
  .version(COMMAND_VERSION)
  .description("Keep a changelog? Read a changelog.");

program
  .command("view")
  .description(
    "View a CHANGELOG.md for a given module spec and optionally filter content to a version or date"
  )
  .argument(
    "<module_spec>",
    "Module spec to read the CHANGELOG.md from; anything you pass to npm could be passed here"
  )
  .option(
    "--version <spec>",
    "Filter content to a given semver spec, e.g. 1.0.0 or >=1.0.0"
  )
  .option("--date <date>", "Filter content to a given date")
  .option("--format <format>", "Output format as json or raw", "raw")
  .option(
    "--cacheDir <dir>",
    "Cache directory when percote downloads packages",
    "/tmp"
  )
  .action(async (module_spec: string, options: ViewOptions) => {
    const viewCommand = new ChangelogCli({
      lookupOptions: {
        cacheDir: options.cacheDir,
      },
    });
    const versionOrDateInput = options.version || options.date;
    const versionOrDate = ChangelogLib.parseVersionOrDate(versionOrDateInput);

    viewCommand.run({
      moduleSpec: module_spec,
      versionOrDate: versionOrDate,
      outputFormat: options.format,
    });
  });

program.parse();
