import * as fs from "fs";
import { ReadachangelogError } from "./error";

export abstract class FileMatchRuleBase {
  label: string;
  isConventional: boolean;
  abstract ruleType: "exact" | "regex";
  priority: number;
}

export class ExactFileMatchRule extends FileMatchRuleBase {
  rule: string;
  ruleType: "exact";
}

export class RegexFileMatchRule extends FileMatchRuleBase {
  rule: RegExp;
  ruleType: "regex";
}

export type FileMatchRule = RegexFileMatchRule | ExactFileMatchRule;

export class FileMatch {
  file: string;
  rule: FileMatchRule;
}

/**
 * The rules to check against. These should be in order and match docs/lookup.md.
 */
export const FileMatchRules: FileMatchRule[] = [
  {
    label: "CHANGELOG.md",
    rule: "changelog.md",
    ruleType: "exact",
    isConventional: true,
    priority: 100,
  },
  {
    label: "Unconventional: changelog",
    rule: /^changelog(\.md|\.[a-z_-]*\.md|\.markdown|)$/,
    ruleType: "regex",
    isConventional: false,
    priority: 90,
  },
  {
    label: "Unconventional: changes",
    rule: /^changes(|\.md|\.markdown)$/,
    ruleType: "regex",
    isConventional: false,
    priority: 80,
  },
  {
    label: "Unconventional: history",
    rule: /^history(|\.md|\.markdown)$/,
    ruleType: "regex",
    isConventional: false,
    priority: 70,
  },
  {
    label: "Unconventional: release-notes.md",
    rule: "release-notes.md",
    ruleType: "exact",
    isConventional: false,
    priority: 60,
  },
  {
    label: "Unconventional: releasenotes.md",
    rule: "releasenotes.md",
    ruleType: "exact",
    isConventional: false,
    priority: 50,
  },
];

export class FileMatcher {
  getMatchForFile(file: string): FileMatch | undefined {
    const lowercaseFile = file.toLowerCase();
    for (const rule of FileMatchRules) {
      if (rule.ruleType === "exact") {
        if (lowercaseFile === rule.rule) {
          return {
            file: file,
            rule: rule,
          };
        }
        continue;
      }
      if (rule.ruleType === "regex") {
        if (rule.rule.test(lowercaseFile)) {
          return {
            file: file,
            rule: rule,
          };
        }
        continue;
      }
      throw new ReadachangelogError("Unsupported rule type");
    }
    return undefined;
  }

  getMatchesForFiles(files: string[]): FileMatch[] {
    const matches: FileMatch[] = [];
    for (const file of files) {
      const match = this.getMatchForFile(file);
      if (match === undefined) {
        continue;
      }
      matches.push(match);
    }
    return matches;
  }

  async getMatchesForDir(dir: string): Promise<FileMatch[]> {
    try {
      const filesInDir = fs.readdirSync(dir);
      return this.getMatchesForFiles(filesInDir);
    } catch (e) {
      throw new ReadachangelogError(
        `Could not read ${dir} because ${e.message}`
      );
    }
  }

  getHighestPriorityMatch(matches: FileMatch[]): FileMatch | undefined {
    if (matches.length < 1) {
      return undefined;
    }
    const highestPriorityMatch = matches.reduce((prev, current) => {
      return current.rule.priority > prev.rule.priority ? current : prev;
    });
    return highestPriorityMatch;
  }
}
