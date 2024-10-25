import { VersionOrDateMatch } from "./dto";

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
  moduleSpec: string;
  versionOrDate: VersionOrDateMatch;
  outputFormat: "raw" | "json";
}
