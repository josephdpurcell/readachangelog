import * as fs from "fs";
import * as pacote from "pacote";
import * as path from "path";
import { COMMAND_NAME } from "./dto";
import { ReadachangelogError } from "./error";
import { ReadachangelogUtility } from "./lib";

export class ReadachangelogLookupOptions {
  cacheDir: string;
}

/**
 * Find and return the contents of a CHANGELOG.md.
 */
export class ReadachangelogLookup {
  protected readonly options: ReadachangelogLookupOptions;

  constructor(options?: Partial<ReadachangelogLookupOptions>) {
    const cacheDir = options?.cacheDir ?? `/tmp/${COMMAND_NAME}`;
    this.options = {
      cacheDir: path.resolve(cacheDir),
    };
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
    const changelog = `${dir}/CHANGELOG.md`;

    if (!fs.existsSync(dir)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await pacote.extract(specInput, dir, config);
    }

    if (!fs.existsSync(changelog)) {
      throw new ReadachangelogError(
        `Spec ${specInput} does not have a changelog, checked ${changelog}`
      );
    }
    const changelogContent = fs.readFileSync(changelog, "utf-8");
    return changelogContent;
  }
}
