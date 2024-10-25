/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Config from "@npmcli/config";
import {
  definitions,
  flatten,
  shorthands,
} from "@npmcli/config/lib/definitions";
import * as path from "path";
import * as semver from "semver";
import { ChangelogCliInputArguments } from "./command.view.dto";
import type { VersionOrDateMatch } from "./dto";
import { ChangelogError } from "./error";
import type { Changelog, ChangelogVersion } from "./parser";

/**
 * Utility functions to help with the CLI.
 *
 * Note: we do static props to organize a bunch of functions in a central place instead of
 * various functions with no context.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ChangelogLib {
  static getArgsFromProcess(): Partial<ChangelogCliInputArguments> {
    for (const arg of process.argv) {
      if (["--help", "-h"].includes(arg)) {
        return {
          command: "help",
        };
      }
    }
    return {
      command: "run",
      moduleName: process.argv[2],
      versionOrDate: process.argv[3],
    };
  }

  static parseVersionOrDate(input?: string): VersionOrDateMatch {
    if (!input || input === "all") {
      return {
        input: input ?? "",
        type: "all",
      };
    }

    const lastCharIsWildcard = input.charAt(input.length - 1) === "*";

    // Check year first since a year is a valid semver range
    const yearRegex = /^([0-9]{4})-?\*?$/;
    const yearMatch = input.match(yearRegex);
    if (yearMatch && yearMatch.length > 1) {
      return {
        input,
        wildcardType: lastCharIsWildcard ? "year" : "none",
        date: yearMatch[1],
        type: "date",
      };
    }

    // Check semver version first since all versions are valid semver ranges
    const isValidVersion = semver.valid(input);
    if (isValidVersion) {
      return {
        input,
        version: isValidVersion,
        type: "version",
      };
    }

    // Now we can check semver valid ranges
    const isValidRange = semver.validRange(input);
    if (isValidRange) {
      return {
        input,
        version: isValidRange,
        type: "versionrange",
      };
    }

    // Now the rest of the dates
    const monthRegex = /^([0-9]{4})-(0[1-9]|1[0-2])-?\*?$/;
    const monthMatch = input.match(monthRegex);
    if (monthMatch && monthMatch.length > 1) {
      return {
        input,
        wildcardType: lastCharIsWildcard ? "month" : "none",
        date: `${monthMatch[1]}-${monthMatch[2]}`,
        type: "date",
      };
    }

    const dayRegex = /^([0-9]{4})-(0[1-9]|1[0-2])-([0-9]{2})$/;
    const dayMatch = input.match(dayRegex);
    if (dayMatch && dayMatch.length > 1) {
      return {
        input,
        wildcardType: "none",
        date: `${dayMatch[1]}-${dayMatch[2]}-${dayMatch[3]}`,
        type: "date",
      };
    }

    throw new ChangelogError("Invalid version or date");
  }

  static getMatches(
    changelog: Changelog,
    versionOrDate: VersionOrDateMatch
  ): ChangelogVersion[] {
    const matches: ChangelogVersion[] = [];
    for (const version of changelog.versions) {
      if (!ChangelogLib.isMatch(version, versionOrDate)) {
        continue;
      }
      matches.push(version);
    }
    return matches;
  }

  static isMatch(
    changelogVersion: ChangelogVersion,
    versionOrDate: VersionOrDateMatch
  ): boolean {
    // ==============================================================
    // ALL
    if (versionOrDate.type === "all") {
      return true;
    }

    // ==============================================================
    // DATE
    if (versionOrDate.type === "date") {
      if (versionOrDate.wildcardType !== "none") {
        // Its a match if the first characters match, because dates are always YYYY-MM-DD or fewer.
        if (changelogVersion.date?.indexOf(versionOrDate.date) === 0) {
          return true;
        }
        return false;
      }
      if (changelogVersion.date === versionOrDate.date) {
        return true;
      }
      return false;
    }

    // ==============================================================
    // VERSION
    if (versionOrDate.type === "version") {
      // TODO: handle wildcards??
      if (changelogVersion.version === versionOrDate.version) {
        return true;
      }
      return false;
    }

    // ==============================================================
    // VERSIONRANGE
    if (versionOrDate.type === "versionrange") {
      if (semver.satisfies(changelogVersion.version, versionOrDate.version)) {
        return true;
      }
      return false;
    }

    // Unknown
    return false;
  }

  static async getNpmConfig(
    overrides?: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    // Note: I bet when I set type: module in package.json to get the estlint-love to work this changed
    // eslint-disable-next-line new-cap
    const conf = new Config.default({
      // path to the npm module being run
      npmPath: path.resolve(__dirname, ".."),
      definitions,
      shorthands,
      flatten,
      // optional, defaults to process.argv
      // argv: [] <- if you are using this package in your own cli
      //             and dont want to have colliding argv
      argv: process.argv,
      // optional, defaults to process.env
      env: process.env,
      // optional, defaults to process.execPath
      execPath: process.execPath,
      // optional, defaults to process.platform
      platform: process.platform,
      // optional, defaults to process.cwd()
      cwd: process.cwd(),
      ...overrides,
    });

    const promise = new Promise<Record<string, unknown>>((resolve, reject) => {
      conf
        .load()
        .then(() => {
          const config = Object.assign({}, ...conf.list);
          resolve(config);
        })
        .catch((e) => {
          reject(
            new ChangelogError(`Failed to load NPM config because ${e.message}`)
          );
        });
    });
    return await promise;
  }
}
