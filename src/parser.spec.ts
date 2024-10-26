import * as fs from "fs";
import { TEST_FILES_DIR } from "./dto";
import { ChangelogParser } from "./parser";

describe("ChangelogParser", () => {
  const parser = new ChangelogParser();

  it("CHANGELOG-empty.md", async () => {
    const result = await parser.parseFilePath(
      `${TEST_FILES_DIR}/CHANGELOG-empty.md`
    );
    expect(result.versions.length).toEqual(0);
  });

  it("filePath CHANGELOG-basic.md", async () => {
    const result = await parser.parseFilePath(
      `${TEST_FILES_DIR}/CHANGELOG-basic.md`
    );
    expect(result.versions.length).toEqual(3);
    expect(result.versions[0].version).toEqual("1.1.0");
    expect(result.versions[0].body).toEqual("- baz");
    expect(result.versions[1].version).toEqual("1.0.0");
    expect(result.versions[1].body).toEqual("- bar");
    expect(result.versions[2].version).toEqual("0.0.1");
    expect(result.versions[2].body).toEqual("- foo");
  });

  it("string CHANGELOG-basic.md", async () => {
    const changelogContent = fs.readFileSync(
      `${TEST_FILES_DIR}/CHANGELOG-basic.md`,
      "utf-8"
    );
    const result = await parser.parseString(changelogContent);
    expect(result.versions.length).toEqual(3);
    expect(result.versions[0].version).toEqual("1.1.0");
    expect(result.versions[0].body).toEqual("- baz");
    expect(result.versions[1].version).toEqual("1.0.0");
    expect(result.versions[1].body).toEqual("- bar");
    expect(result.versions[2].version).toEqual("0.0.1");
    expect(result.versions[2].body).toEqual("- foo");
  });
});
