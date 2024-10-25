export const COMMAND_NAME = "readachangelog";
export const EXIT_CODE_FAILURE = 0;

export class ChangelogLookupOptions {
  cacheDir: string;
}

/**
 * Configuration used to instantiate the CLI tool.
 */
export class ChangelogCliConfig {
  lookupOptions?: Partial<ChangelogLookupOptions>;
}

/**
 * Map inputs from process.argv.
 */
export class ChangelogCliInputArguments {
  command: "run" | "help";
  moduleName: string;
  versionOrDate?: string;
  format: "raw" | "json";
}

/**
 * The actual arguments we need to run the command.
 */
export class ChangelogCliArguments {
  moduleName: string;
  versionOrDate: VersionOrDateMatch;
  outputFormat: "raw" | "json";
}

export interface VersionOrDateMatchBase {
  input: string;
  type: string;
}

export class VersionRangeMatch implements VersionOrDateMatchBase {
  input: string;
  /**
   * The cleaned version range, can be used with "satisfies"
   */
  version: string;
  type: "versionrange";
}

export class VersionMatch implements VersionOrDateMatchBase {
  input: string;
  /**
   * The cleaned version, can be used with an exact match.
   */
  version: string;
  type: "version";
}

/**
 *
 */
export class DateMatch implements VersionOrDateMatchBase {
  input: string;
  date: string;
  /**
   * If none the user specified no * characters
   * If year the user specified like YYYY-*
   * If month the user specified like YYYY-MM-*
   */
  wildcardType: "none" | "year" | "month";
  type: "date";
}

/**
 * Print the entire CHANGELOG.md, unparsed.
 */
export class AllMatch implements VersionOrDateMatchBase {
  input: string;
  type: "all";
}

export type VersionOrDateMatch =
  | VersionRangeMatch
  | VersionMatch
  | DateMatch
  | AllMatch;
