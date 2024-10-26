import * as fs from "fs";
import * as pacote from "pacote";
import * as path from "path";
import { COMMAND_NAME } from "./dto";
import { ReadachangelogError } from "./error";
import { FileMatcher } from "./file-matcher";
import { ReadachangelogUtility } from "./lib";

export class ReadachangelogLookupOptions {
  cacheDir: string;
}

/**
 * Find and return the contents of a CHANGELOG.md.
 */
export class ReadachangelogLookup {
  protected readonly options: ReadachangelogLookupOptions;
  protected readonly fileMatcher: FileMatcher;

  constructor(options?: Partial<ReadachangelogLookupOptions>) {
    const cacheDir = options?.cacheDir ?? `/tmp/${COMMAND_NAME}`;
    this.options = {
      cacheDir: path.resolve(cacheDir),
    };
    this.fileMatcher = new FileMatcher();
  }

  /**
   * The entrypoint method that will find the CHANGELOG.md file.
   */
  async lookup(specInput: string): Promise<string> {
    // Note: logic could be implemented to read from node_modules directory. I expect there is
    // a use case for "give me the changelog of the installed version". But, I don't know how
    // to represent that for CLI arguments at the moment.
    return await this.fromNpm(specInput);
  }

  async fromNpm(specInput: string): Promise<string> {
    const config = await ReadachangelogUtility.getNpmConfig();

    const dir = `${this.options.cacheDir}/${specInput}`;

    if (!fs.existsSync(dir)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await pacote.extract(specInput, dir, config);
    }

    const matchedFiles = await this.fileMatcher.getMatchesForDir(dir);
    const highestPriorityMatch =
      this.fileMatcher.getHighestPriorityMatch(matchedFiles);
    if (highestPriorityMatch === undefined) {
      throw new ReadachangelogError(
        `Spec ${specInput} does not have a changelog, checked ${dir}`
      );
    }

    const changelog = `${dir}/${highestPriorityMatch.file}`;
    try {
      const changelogContent = fs.readFileSync(changelog, "utf-8");
      return changelogContent;
    } catch (e) {
      throw new ReadachangelogError(
        `Spec ${specInput} has ${changelog} that could not be read because ${e.message}`
      );
    }
  }
}
