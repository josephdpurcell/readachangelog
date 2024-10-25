import { VersionOrDateMatch } from "./dto";
import { ReadachangelogLookupOptions } from "./lookup";

/**
 * Configuration used to instantiate the CLI tool.
 */
export class ViewCommandConfig {
  lookupOptions?: Partial<ReadachangelogLookupOptions>;
}

/**
 * The arguments the user passes to the CLI.
 */
export class ViewCommandInputArguments {
  version?: string;
  date?: string;
  limit?: number;
  // Options that have defaults are always set:
  format: "raw" | "json";
  cacheDir: string;
}

/**
 * The actual arguments we need to run the command.
 */
export class ViewCommandArguments {
  packageSpec: string;
  versionOrDate: VersionOrDateMatch;
  outputFormat: "raw" | "json";
  /**
   * A negative number, zero, or undefined is unlimited. Only positive numbers limit.
   */
  limit: number | undefined;
}
