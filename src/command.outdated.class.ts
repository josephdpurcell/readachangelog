import {
  OutdatedCommandArguments,
  OutdatedCommandConfig,
  OutdatedOutput,
} from "./command.outdated.dto";
import { ReadachangelogError } from "./error";
import { ReadachangelogUtility } from "./lib";
import { ReadachangelogLookup } from "./lookup";
import { Outdated } from "./outdated";
import { ChangelogParser } from "./parser";

/**
 * Print the outdated contents of a CHANGELOG.md
 */
export class OutdatedCommand {
  protected readonly lookup: ReadachangelogLookup;
  protected readonly parser: ChangelogParser;
  protected readonly outdated: Outdated;

  constructor(options?: Partial<OutdatedCommandConfig>) {
    this.lookup = new ReadachangelogLookup(options?.lookupOptions);
    this.parser = new ChangelogParser();
    this.outdated = new Outdated();
  }

  /**
   * Run with the given args.
   */
  async run(args: OutdatedCommandArguments): Promise<void> {
    const outdatedDeps = await this.outdated.getOutdatedDependencies();

    const output: OutdatedOutput = {
      dependencies: [],
    };
    for (const packageName in outdatedDeps) {
      const outdatedPackage = outdatedDeps[packageName];
      const content = await this.lookup.lookup(
        `${outdatedPackage.name}@${outdatedPackage.wanted}`
      );
      const parsed = await this.parser.parseString(content);

      const sections = ReadachangelogUtility.getMatches(
        parsed,
        {
          input: "",
          version: `>${outdatedPackage.current} <=${outdatedPackage.wanted}`,
          type: "versionrange",
        },
        undefined
      );

      output.dependencies.push({
        ...outdatedPackage,
        changes: sections,
      });
    }

    if (args.outputFormat === "json") {
      console.log(JSON.stringify(output));
      return;
    }

    if (args.outputFormat === "raw") {
      const strings: string[] = [];
      for (const dependency of output.dependencies) {
        strings.push(`## ${dependency.name}`);
        strings.push(`**Current:** ${dependency.current}`);
        strings.push(`**Wanted:** ${dependency.wanted}`);
        strings.push(`**Latest:** ${dependency.latest}`);
        if (dependency.changes.length < 1) {
          strings.push(
            `No changes are wanted, but there is a newer version available.`
          );
        } else {
          for (const s of dependency.changes) {
            // Note: decided to not add ## since it doesn't format in Slack
            strings.push(`${s.title}\n\n${s.body}`);
          }
        }
      }
      console.log(strings.join("\n\n"));
      return;
    }
    throw new ReadachangelogError("Invalid output format");
  }
}
