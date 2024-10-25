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
        versions: sections,
      });
    }

    if (args.outputFormat === "json") {
      console.log(JSON.stringify(output));
      return;
    }

    if (args.outputFormat === "raw") {
      const strings: string[] = [];
      for (const dependency of output.dependencies) {
        // Since versions are 2nd level heading we have to do a repeated 1st level heading
        // Can't win every battle?
        strings.push(`# ${dependency.name}`);
        strings.push(`**Current:** ${dependency.current}`);
        strings.push(`**Wanted:** ${dependency.wanted}`);
        strings.push(`**Latest:** ${dependency.latest}`);
        if (dependency.versions.length < 1) {
          strings.push(
            `No changes are wanted, but there is a newer version available.`
          );
        } else {
          for (const s of dependency.versions) {
            // https://common-changelog.org/ says a version is a 2nd level heading
            strings.push(`## ${s.title}\n\n${s.body}`);
          }
        }
      }
      console.log(strings.join("\n\n"));
      return;
    }
    throw new ReadachangelogError("Invalid output format");
  }
}
