import {
  OutdatedCommandArguments,
  OutdatedCommandConfig,
  OutdatedOutput,
  OutdatedPackageFilter,
} from "./command.outdated.dto";
import { ReadachangelogError } from "./error";
import { ReadachangelogUtility } from "./lib";
import { ReadachangelogLookup } from "./lookup";
import { Outdated, OutdatedDependencies, OutdatedDependency } from "./outdated";
import { PackageSpec } from "./package-spec";
import { ChangelogParser, ChangelogVersion } from "./parser";

/**
 * Print the outdated contents of a CHANGELOG.md
 */
export class OutdatedCommand {
  protected readonly lookup: ReadachangelogLookup;
  protected readonly parser: ChangelogParser;
  protected readonly outdated: Outdated;
  protected readonly packageSpec: PackageSpec;

  constructor(options?: Partial<OutdatedCommandConfig>) {
    this.lookup = new ReadachangelogLookup(options?.lookupOptions);
    this.parser = new ChangelogParser();
    this.outdated = new Outdated();
    this.packageSpec = new PackageSpec();
  }

  /**
   * Run with the given args.
   */
  async run(args: OutdatedCommandArguments): Promise<void> {
    const outdatedDeps = await this.getOutdatedDependencies(args.filter);

    const output = await this.getOutput(outdatedDeps, args.filter);

    if (args.outputFormat === "json") {
      console.log(JSON.stringify(output));
      return;
    }

    if (args.outputFormat === "raw") {
      const strings: string[] = [];

      // Add header
      if (args.header) {
        strings.push(`# Changelog`);
        if (args.filter) {
          strings.push(`**Filter**:`);
          if (args.filter.scope) {
            strings.push(`- Scope: ${args.filter.scope}`);
          }
        }
      }

      if (!output.dependencies.length) {
        strings.push("No outdated dependencies found");
      } else {
        // Add TOC
        if (args.toc) {
          const toc: string[] = [];
          toc.push(`# Table of Contents\n`);
          for (const dependency of output.dependencies) {
            const anchorId = this.getAnchorId(dependency.name);
            let tocLine = `- [${dependency.name}](#${anchorId}): ${dependency.current} --> ${dependency.wanted} (Latest ${dependency.latest})`;
            if (!dependency.hasChangelog) {
              tocLine = tocLine + ` MISSING CHANGELOG.md`;
            }
            toc.push(tocLine);
          }
          strings.push(toc.join("\n"));
        }

        for (const dependency of output.dependencies) {
          // Since versions are 2nd level heading we have to do a repeated 1st level heading
          // Can't win every battle?
          const anchorId = this.getAnchorId(dependency.name);
          if (args.toc) {
            strings.push(`<a id="${anchorId}"></a>`);
          }
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
      }
      console.log(strings.join("\n\n"));
      return;
    }
    throw new ReadachangelogError("Invalid output format");
  }

  protected async getOutdatedDependencies(
    filter?: OutdatedPackageFilter
  ): Promise<OutdatedDependencies> {
    const outdatedDeps = await this.outdated.getOutdatedDependencies();

    if (!filter) {
      return outdatedDeps;
    }

    // Assume any filtering will require the NPM config.
    const npmConfig = await this.lookup.getNpmConfig();

    // Perform filtering
    const filteredDeps: OutdatedDependencies = {};
    for (const key in outdatedDeps) {
      const outdatedDep = outdatedDeps[key];
      if (filter.scope) {
        // TODO: untangle this... outdated command needs the spec at some point anywhere
        // so we should only do that once. An easy way to do that is to make the getOutdatedDependencies()
        // return with the spec data and then pass that around.
        const spec = this.packageSpec.fromInput(outdatedDep.name, npmConfig);
        if (spec.scope !== filter.scope) {
          continue;
        }
      }
      filteredDeps[key] = outdatedDep;
    }

    return filteredDeps;
  }

  protected async getOutput(
    outdatedDeps: OutdatedDependencies,
    filter?: OutdatedPackageFilter
  ): Promise<OutdatedOutput> {
    const output: OutdatedOutput = {
      filter: filter,
      dependencies: [],
    };
    for (const packageName in outdatedDeps) {
      const outdatedPackage = outdatedDeps[packageName];
      const content = await this.getContent(outdatedPackage);
      const sections = await this.getMatchingSections(content, outdatedPackage);

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

  async getMatchingSections(
    content: string | undefined,
    outdatedPackage: OutdatedDependency
  ): Promise<ChangelogVersion[]> {
    if (!content) {
      return [];
    }
    const parsed = await this.parser.parseString(content);
    const sections = ReadachangelogUtility.getMatchingSections(
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

  protected getAnchorId(name: string): string {
    const result = name.replace(/[^a-zA-Z0-9-_]/g, "");
    return result;
  }
}
