import { fail } from "assert";
import * as fs from "fs";
import * as path from "path";
import { TEST_FILES_DIR } from "./dto";
import { FileMatch } from "./file-match";

class FileTestCase {
  score: number;
  file: string;
  match: boolean;
}

describe("FileMatch", () => {
  const match = new FileMatch();

  it("package-files-with-score.json", async () => {
    const testFile = `${TEST_FILES_DIR}/package-files-with-score.json`;
    const filePath = path.resolve(testFile);
    const content = fs.readFileSync(filePath, "utf-8");
    const testCases: FileTestCase[] = JSON.parse(content);

    for (const testCase of testCases) {
      const isMatch = match.isChangelog(testCase.file);
      if (isMatch !== testCase.match) {
        fail(
          `File ${testCase.file} test failed: got ${isMatch} but expected ${testCase.match}`
        );
      }
    }
  });
});
