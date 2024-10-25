import { VersionOrDateMatch } from "./dto";
import { ReadachangelogLookupOptions } from "./lookup";

/**
 * Configuration used to instantiate the CLI tool.
 */
export class ViewCommandConfig {
  lookupOptions?: Partial<ReadachangelogLookupOptions>;
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
