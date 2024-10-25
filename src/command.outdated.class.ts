import {
  OutdatedCommandArguments,
  OutdatedCommandConfig,
  OutdatedOutput,
} from "./command.outdated.dto";
import { ReadachangelogError } from "./error";
import { ReadachangelogUtility } from "./lib";
import { ReadachangelogLookup } from "./lookup";
import { Outdated, OutdatedDependencies, OutdatedDependency } from "./outdated";
import { ChangelogParser, ChangelogVersion } from "./parser";

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
    const output = await this.getOutput(outdatedDeps);

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
        if (dependency.homepage) {
          strings.push(`**Homepage:** ${dependency.homepage}`);
        }
        strings.push(`**Current:** ${dependency.current}`);
        strings.push(`**Wanted:** ${dependency.wanted}`);
        strings.push(`**Latest:** ${dependency.latest}`);
        if (!dependency.hasChangelog) {
          strings.push(`No CHANGELOG.md content was found.`);
        } else if (dependency.versions.length < 1) {
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

  protected async getOutput(
    outdatedDeps: OutdatedDependencies
  ): Promise<OutdatedOutput> {
    const output: OutdatedOutput = {
      dependencies: [],
    };
    for (const packageName in outdatedDeps) {
      const outdatedPackage = outdatedDeps[packageName];
      const content = await this.getContent(outdatedPackage);
      const sections = await this.getSections(content, outdatedPackage);

      output.dependencies.push({
        ...outdatedPackage,
        hasChangelog: content ? true : false,
        versions: sections,
      });
    }
    return output;
  }

  protected async getContent(
    outdatedPackage: OutdatedDependency
  ): Promise<string | undefined> {
    try {
      const content = await this.lookup.lookup(
        `${outdatedPackage.name}@${outdatedPackage.wanted}`
      );
      return content;
    } catch (e) {
      return undefined;
    }
  }

  async getSections(
    content: string | undefined,
    outdatedPackage: OutdatedDependency
  ): Promise<ChangelogVersion[]> {
    if (!content) {
      return [];
    }
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
    return sections;
  }
}
