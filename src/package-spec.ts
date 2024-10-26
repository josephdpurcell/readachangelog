import * as npa from "npm-package-arg";

/**
 * This is what npa gives.
 */
export class NpaSpec {
  /**
   * The full package name including the scope.
   */
  name: string;
  /**
   * The package scope if it exists, else undefined? or null?
   */
  scope?: string;
  /**
   * What are we going to fetch? If it was just <pacakge> this will be "*" but otherwise it will
   * the <spec> from <package>@<spec>.
   */
  fetchSpec: string;
  escapedName: string;
  rawSpec: string;
  registry: boolean;
  /**
   * The value here depends on the input.
   *
   * From file:
   * file or directory.
   *
   * From alias:
   * always just alias.
   *
   * From hosted git:
   * always just git.
   *
   * From URL:
   * Will be git if its apparently a git URL, else remote.
   *
   * From registry:
   * If you pass a proper version to <package>@<spec> then this will be version.
   * Otherwise if semver says its a range it will be a range. Otherwise it must be a tag.
   */
  type:
    | "file"
    | "directory"
    | "alias"
    | "git"
    | "remote"
    | "range"
    | "version"
    | "tag";
  where?: unknown;
  /**
   * The raw input.
   */
  raw: string;
  // Note: there are other fields I haven't noted
}

/**
 * Utility for taking an input and getting a standardized package spec.
 */
export class PackageSpec {
  fromInput(specInput: string, config: Record<string, unknown>): NpaSpec {
    const spec = npa.default(specInput, config.where);
    return spec;
  }
}
