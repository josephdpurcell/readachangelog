/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as parseChangelog from "changelog-parser";
import * as path from "path";

export class ChangelogVersion {
  body: string;
  date: string | null;
  parsed: unknown;
  title: string;
  version: string;
}

export class Changelog {
  versions: ChangelogVersion[];
}

export class ChangelogParser {
  async parseFilePath(filePathInput: string): Promise<Changelog> {
    const filePath = path.resolve(filePathInput);
    return parseChangelog.default({
      filePath,
    });
  }

  async parseString(content: string): Promise<Changelog> {
    return parseChangelog.default({
      text: content,
    });
  }
}
