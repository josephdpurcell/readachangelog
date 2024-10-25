import { ChangelogLookup } from "./lookup";

describe("ChangelogLookup", () => {
  const lookup = new ChangelogLookup();

  it("fromNpm changelog-parser", async () => {
    const content = await lookup.fromNpm("changelog-parser");
    // We dont' just want to make sure it read data, we want to make sure its the right file
    expect(content.indexOf("# Change Log")).toEqual(0);
  });
});
