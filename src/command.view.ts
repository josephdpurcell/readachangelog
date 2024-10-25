import {
  ChangelogCliArguments,
  ChangelogCliConfig,
  ChangelogCliInputArguments,
} from "./command.view.dto";
import { COMMAND_NAME, COMMAND_VERSION, EXIT_CODE_FAILURE } from "./dto";
import { ChangelogError } from "./error";
import { ChangelogLib } from "./lib";
import { ChangelogLookup } from "./lookup";
import { ChangelogParser, type Changelog } from "./parser";

/**
 * Print the contents of a CHANGELOG.md.
 */
export class ChangelogCli {
  protected readonly lookup: ChangelogLookup;
  protected readonly parser: ChangelogParser;

  constructor(options?: Partial<ChangelogCliConfig>) {
    this.lookup = new ChangelogLookup(options?.lookupOptions);
    this.parser = new ChangelogParser();
  }

  /**
   * Run, but first get args from process.
   */
  async runWrapper(): Promise<void> {
    try {
      const args = ChangelogLib.getArgsFromProcess();
      if (args.command === "help") {
        await this.help();
        process.exit(EXIT_CODE_FAILURE);
      }
      const validArgs = this.convertInputArgsToArgs(args);
      await this.run(validArgs);
    } catch (e) {
      if (e instanceof Error) {
        console.error(`ERROR: ${e.message}`);
      }
      process.exit(EXIT_CODE_FAILURE);
    }
  }

  /**
   * Run with the given args.
   */
  async run(args: ChangelogCliArguments): Promise<void> {
    // Get the changelog contents
    const content = await this.lookup.lookup(args.moduleSpec);

    // If we are printing the raw file don't do ANY processing.
    if (args.versionOrDate.type === "all" && args.outputFormat === "raw") {
      console.log(content);
      return;
    }

    // Parse the changelog
    const parsed = await this.parser.parseString(content);
    const sections = ChangelogLib.getMatches(parsed, args.versionOrDate);
    if (!sections.length) {
      throw new ChangelogError(
        `No CHANGELOG.md sections matching ${args.versionOrDate.input}`
      );
    }
    if (args.outputFormat === "json") {
      const output: Changelog = {
        versions: sections,
      };
      console.log(JSON.stringify(output));
      return;
    }
    if (args.outputFormat === "raw") {
      const strings = sections.map((s) => {
        // Note: decided to not add ## since it doesn't format in Slack
        return `${s.title}\n\n${s.body}`;
      });
      console.log(strings.join("\n\n"));
      return;
    }
    throw new ChangelogError("Invalid output format");
  }

  async help(): Promise<void> {
    console.log(`NAME
    ${COMMAND_NAME} v${COMMAND_VERSION} - read changelog data from npm modules on any registry

SYNOPSIS
    changelog [module_spec] [version]

    changelog [module_spec] [date]

    changelog [--help | -h]

OPTIONS
    module_spec (required) - The spec of a module you want to read the changelog from; anything you could pass to npm install can be passed here.

    version (optional) - The semver version or semver version range you want to read out of the changelog.

    date (optional) - The date or date wildcard you want to read out of the changelog.

    -h, --help (optional) - Print the help information.

EXAMPLES
    To print the latest version:

        ${COMMAND_NAME} foo

        OR

        ${COMMAND_NAME} foo latest

    To print the latest version using a specific module version:

        ${COMMAND_NAME} foo@1.0.0

    To print the entire changelog:

        ${COMMAND_NAME} foo all

    To print for a date:

        ${COMMAND_NAME} foo 1970-01-01

        ${COMMAND_NAME} foo 1970-01-*

        ${COMMAND_NAME} foo 1970-*

    To print for a version:

        ${COMMAND_NAME} foo 1.0.0

        ${COMMAND_NAME} foo >=1.0.0
`);
  }

  /**
   * Convert inputs from process to args for running.
   */
  protected convertInputArgsToArgs(
    args?: Partial<ChangelogCliInputArguments>
  ): ChangelogCliArguments {
    if (!args?.moduleName) {
      throw new ChangelogError("Must specify [module_name]");
    }
    const versionOrDate = ChangelogLib.parseVersionOrDate(args.versionOrDate);

    return {
      moduleSpec: args.moduleName,
      versionOrDate,
      outputFormat: "raw",
    };
  }
}
