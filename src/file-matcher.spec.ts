import { fail } from "assert";
import * as fs from "fs";
import * as path from "path";
import { TEST_FILES_DIR } from "./dto";
import { FileMatcher } from "./file-matcher";

class FileTestCase {
  score: number;
  file: string;
  match: boolean;
  priority: number;
}

describe(FileMatcher.name, () => {
  const matcher = new FileMatcher();

  it("package-files-with-score.json", async () => {
    const testFile = `${TEST_FILES_DIR}/package-files-with-score.json`;
    const filePath = path.resolve(testFile);
    const content = fs.readFileSync(filePath, "utf-8");
    const testCases: FileTestCase[] = JSON.parse(content);

    for (const testCase of testCases) {
      const matchingRule = matcher.getMatchForFile(testCase.file);
      const isMatch = matchingRule === undefined ? false : true;
      if (isMatch !== testCase.match) {
        fail(
          `File ${testCase.file} test failed: got ${isMatch} but expected ${testCase.match}`
        );
      }
    }
  });

  it("getMatchesForDir 1", async () => {
    // The current dir is the root of our project which will have only 1 match
    const matches = await matcher.getMatchesForDir(".");
    expect(matches.length).toEqual(1);
  });

  it("getMatchesForDir 0", async () => {
    // The test files dir will have no matches
    const matches = await matcher.getMatchesForDir(TEST_FILES_DIR);
    expect(matches.length).toEqual(0);
  });
});
