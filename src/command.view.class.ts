import { ViewCommandArguments, ViewCommandConfig } from "./command.view.dto";
import { ReadachangelogError } from "./error";
import { ReadachangelogUtility } from "./lib";
import { ReadachangelogLookup } from "./lookup";
import { ChangelogParser, type Changelog } from "./parser";

/**
 * Print the contents of a CHANGELOG.md.
 */
export class ViewCommand {
  protected readonly lookup: ReadachangelogLookup;
  protected readonly parser: ChangelogParser;

  constructor(options?: Partial<ViewCommandConfig>) {
    this.lookup = new ReadachangelogLookup(options?.lookupOptions);
    this.parser = new ChangelogParser();
  }

  /**
   * Run with the given args.
   */
  async run(args: ViewCommandArguments): Promise<void> {
    // Get the changelog contents
    const content = await this.lookup.lookup(args.packageSpec);
    const limit: number | undefined =
      args.limit && args.limit > 0 ? args.limit : undefined;

    // If we are printing the raw file don't do ANY processing.
    if (
      args.versionOrDate.type === "all" &&
      args.outputFormat === "raw" &&
      !limit
    ) {
      console.log(content);
      return;
    }

    // Parse the changelog
    const parsed = await this.parser.parseString(content);
    const sections = ReadachangelogUtility.getMatches(
      parsed,
      args.versionOrDate,
      limit
    );
    if (!sections.length) {
      throw new ReadachangelogError(
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
      // https://common-changelog.org/ says a version is a 2nd level heading
      const strings = sections.map((s) => {
        return `## ${s.title}\n\n${s.body}`;
      });
      console.log(strings.join("\n\n"));
      return;
    }
    throw new ReadachangelogError("Invalid output format");
  }
}
