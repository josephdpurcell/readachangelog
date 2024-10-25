/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as parseChangelog from "changelog-parser";
import * as path from "path";

export class ChangelogVersion {
  body: string;
  date: string | null;
  title: string;
  version: string;
  // Note: the changelog-parser lib has more props than these such as "parsed"
}

export class Changelog {
  versions: ChangelogVersion[];
}

export class ChangelogParser {
  async parseFilePath(filePathInput: string): Promise<Changelog> {
    const filePath = path.resolve(filePathInput);
    const rawFormat = await parseChangelog.default({
      filePath,
    });
    return this.mapToOurDto(rawFormat);
  }

  async parseString(content: string): Promise<Changelog> {
    const rawFormat = await parseChangelog.default({
      text: content,
    });
    return this.mapToOurDto(rawFormat);
  }

  protected mapToOurDto(rawFormat: Changelog): Changelog {
    const ourFormat: Changelog = {
      versions: rawFormat.versions.map((version): ChangelogVersion => {
        return {
          title: version.title,
          version: version.version,
          date: version.date,
          body: version.body,
        };
      }),
    };
    return ourFormat;
  }
}
