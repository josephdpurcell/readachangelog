import { ReadachangelogError } from "./error";

export abstract class FileMatchRuleBase {
  label: string;
  isConventional: boolean;
  abstract ruleType: "exact" | "regex";
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

/**
 * The rules to check against. These should be in order and match docs/lookup.md.
 */
export const FileMatchRules: FileMatchRule[] = [
  {
    label: "CHANGELOG.md",
    rule: "changelog.md",
    ruleType: "exact",
    isConventional: true,
  },
  {
    label: "Unconventional: changelog",
    rule: /^changelog(\.md|\.[a-z_-]*\.md|\.markdown|)$/i,
    ruleType: "regex",
    isConventional: false,
  },
  {
    label: "Unconventional: changes",
    rule: /^changes(|\.md|\.markdown)$/i,
    ruleType: "regex",
    isConventional: false,
  },
  {
    label: "Unconventional: history",
    rule: /^history(|\.md|\.markdown)$/i,
    ruleType: "regex",
    isConventional: false,
  },
  {
    label: "Unconventional: release-notes.md",
    rule: "release-notes.md",
    ruleType: "exact",
    isConventional: false,
  },
  {
    label: "Unconventional: releasenotes.md",
    rule: "releasenotes.md",
    ruleType: "exact",
    isConventional: false,
  },
];

export class FileMatch {
  isChangelog(file: string): boolean {
    const lowercaseFile = file.toLowerCase();
    for (const rule of FileMatchRules) {
      if (rule.ruleType === "exact") {
        if (lowercaseFile === rule.rule) {
          return true;
        }
        continue;
      }
      if (rule.ruleType === "regex") {
        if (rule.rule.test(lowercaseFile)) {
          return true;
        }
        continue;
      }
      throw new ReadachangelogError("Unsupported rule type");
    }
    return false;
  }
}
