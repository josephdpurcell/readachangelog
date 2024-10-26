import * as fs from "fs";
import * as pacote from "pacote";
import * as path from "path";
import { DEFAULT_CACHE_DIR } from "./dto";
import { ReadachangelogError } from "./error";
import { FileMatcher } from "./file-matcher";
import { ReadachangelogUtility } from "./lib";
import { NpaSpec, PackageSpec } from "./package-spec";

export class ReadachangelogLookupOptions {
  cacheDir: string;
}

/**
 * Find and return the contents of a CHANGELOG.md.
 */
export class ReadachangelogLookup {
  protected readonly options: ReadachangelogLookupOptions;
  protected readonly fileMatcher: FileMatcher;
  protected readonly packageSpec: PackageSpec;

  constructor(options?: Partial<ReadachangelogLookupOptions>) {
    const cacheDir = options?.cacheDir ?? DEFAULT_CACHE_DIR;
    this.options = {
      cacheDir: path.resolve(cacheDir),
    };
    this.fileMatcher = new FileMatcher();
    this.packageSpec = new PackageSpec();
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

    // Build a directory name that is safe.
    const spec = this.packageSpec.fromInput(specInput, config);
    const packagePath = this.getCachePackagePath(specInput, spec);
    const dir = `${this.options.cacheDir}/${packagePath}`;

    // We do not need to refetch if its a version type and the directory exists.
    // Every other type we must refetch to avoid stale cache. Pacote will handle purging
    // the directory before extracting. This is actually pretty fast still if Pacote
    // finds the package in NPM cache because it's just deleting the dir and then reading the
    // package from NPM cache and extracting into readachangelog cache.
    if (spec.type !== "version" || !fs.existsSync(dir)) {
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

  getCachePackagePath(specInput: string, spec: NpaSpec): string {
    // If the type is version we can rely on spec.fetchSpec to contain the version.
    const subdir = spec.type === "version" ? spec.fetchSpec : "range";
    const packagePath: string = `${spec.name}/${subdir}`;
    return packagePath;
  }
}
