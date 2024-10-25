import { fail } from "assert";
import { VersionOrDateMatch } from "./dto";
import { ChangelogLib } from "./lib";
import { ChangelogVersion } from "./parser";
describe("ChangelogLib", () => {
  it("date", async () => {
    const tests: Array<[string, VersionOrDateMatch | undefined]> = [
      [
        "2024",
        { input: "2024", type: "date", wildcardType: "none", date: "2024" },
      ],
      [
        "2024-",
        { input: "2024-", type: "date", wildcardType: "none", date: "2024" },
      ],
      [
        "2024-*",
        { input: "2024-*", type: "date", wildcardType: "year", date: "2024" },
      ],
      [
        "2024*",
        { input: "2024*", type: "date", wildcardType: "year", date: "2024" },
      ],
      [
        "2024-10",
        {
          input: "2024-10",
          type: "date",
          wildcardType: "none",
          date: "2024-10",
        },
      ],
      [
        "2024-10-",
        {
          input: "2024-10-",
          type: "date",
          wildcardType: "none",
          date: "2024-10",
        },
      ],
      [
        "2024-10-*",
        {
          input: "2024-10-*",
          type: "date",
          wildcardType: "month",
          date: "2024-10",
        },
      ],
      [
        "2024-10*",
        {
          input: "2024-10*",
          type: "date",
          wildcardType: "month",
          date: "2024-10",
        },
      ],
      [
        "2024-10-23",
        {
          input: "2024-10-23",
          type: "date",
          wildcardType: "none",
          date: "2024-10-23",
        },
      ],
      [
        "2024-01-01",
        {
          input: "2024-01-01",
          type: "date",
          wildcardType: "none",
          date: "2024-01-01",
        },
      ],
      [
        "2024-02-30",
        {
          input: "2024-02-30",
          type: "date",
          wildcardType: "none",
          date: "2024-02-30",
        },
      ], // Invalid date but valid format
      [
        "2024-10-32",
        {
          input: "2024-10-32",
          type: "date",
          wildcardType: "none",
          date: "2024-10-32",
        },
      ], // Invalid date but valid format
      [
        "2024-11-31",
        {
          input: "2024-11-31",
          type: "date",
          wildcardType: "none",
          date: "2024-11-31",
        },
      ], // Invalid date but valid format
      ["2024-13-", undefined], // Invalid month
      ["2024-10-23-some-text", undefined], // Not a date
    ];

    tests.forEach(([input, expectedParsed]) => {
      if (expectedParsed === undefined) {
        expect(() => ChangelogLib.parseVersionOrDate(input)).toThrow();
        return;
      }
      const parsed = ChangelogLib.parseVersionOrDate(input);
      expect(parsed).toEqual(expectedParsed);
    });
  });

  it("version", async () => {
    const tests: Array<[string, VersionOrDateMatch | undefined]> = [
      ["1.0.0", { input: "1.0.0", type: "version", version: "1.0.0" }],
      [
        ">=1.0.0",
        { input: ">=1.0.0", type: "versionrange", version: ">=1.0.0" },
      ],
    ];

    tests.forEach(([input, expectedParsed]) => {
      if (expectedParsed === undefined) {
        expect(() => ChangelogLib.parseVersionOrDate(input)).toThrow();
        return;
      }
      const parsed = ChangelogLib.parseVersionOrDate(input);
      expect(parsed).toEqual(expectedParsed);
    });
  });

  class IsMatchTestCase {
    versionOrDate: VersionOrDateMatch;
    expected: boolean;
  }
  it("isMatch ", async () => {
    const changelogVersion: ChangelogVersion = {
      date: "1970-01-01",
      version: "1.0.0",
      body: "",
      parsed: {},
      title: "",
    };
    const tests: IsMatchTestCase[] = [
      // ALL
      {
        versionOrDate: {
          input: "",
          type: "all",
        },
        expected: true,
      },
      // DATE
      {
        versionOrDate: {
          input: "",
          date: "1970-01-01",
          wildcardType: "none",
          type: "date",
        },
        expected: true,
      },
      {
        versionOrDate: {
          input: "",
          date: "1970-01",
          wildcardType: "month",
          type: "date",
        },
        expected: true,
      },
      {
        versionOrDate: {
          input: "",
          date: "1970",
          wildcardType: "year",
          type: "date",
        },
        expected: true,
      },
      // VERSION
      {
        versionOrDate: {
          input: "",
          version: "1.0.0",
          type: "version",
        },
        expected: true,
      },
      // VERSIONRANGE
      {
        versionOrDate: {
          input: "",
          version: ">=1.0.0",
          type: "versionrange",
        },
        expected: true,
      },
    ];

    tests.forEach((test, index) => {
      const isMatch = ChangelogLib.isMatch(
        changelogVersion,
        test.versionOrDate
      );
      if (test.expected !== isMatch) {
        fail(
          `Test index ${index} failed, got ${isMatch} but expected ${test.expected}`
        );
      }
    });
  });
});
