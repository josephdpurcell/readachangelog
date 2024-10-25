import { ReadachangelogLookupOptions } from "./lookup";
import { OutdatedDependency } from "./outdated";

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
  toc: boolean;
  format: "raw" | "json";
  cacheDir: string;
}

/**
 * The actual arguments we need to run the command.
 */
export class OutdatedCommandArguments {
  toc: boolean;
  outputFormat: "raw" | "json";
}

export class OutdatedDependencyOutput extends OutdatedDependency {
  hasChangelog: boolean;
  versions: ChangelogVersion[];
}

export class OutdatedOutput {
  dependencies: OutdatedDependencyOutput[];
}
