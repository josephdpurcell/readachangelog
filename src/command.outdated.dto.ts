import { ReadachangelogLookupOptions } from "./lookup";
import { GetOutdatedDependency } from "./outdated";
import { ChangelogVersion } from "./parser";

/**
 * Configuration used to instantiate the CLI tool.
 */
export class OutdatedCommandConfig {
  lookupOptions?: Partial<ReadachangelogLookupOptions>;
}

/**
 * The arguments the user passes to the CLI.
 */
export class OutdatedCommandInputArguments {
  // Options that have defaults are always set:
  format: "raw" | "json";
  cacheDir: string;
}

/**
 * The actual arguments we need to run the command.
 */
export class OutdatedCommandArguments {
  outputFormat: "raw" | "json";
}

export class OutdatedDependency extends GetOutdatedDependency {
  versions: ChangelogVersion[];
}

export class OutdatedOutput {
  dependencies: OutdatedDependency[];
}
