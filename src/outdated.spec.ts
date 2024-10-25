import { Outdated } from "./outdated";

describe("Outdated", () => {
  const outdatedd = new Outdated();

  it("outdatedd.getOutdatedDependencies", async () => {
    const outdatedDeps = await outdatedd.getOutdatedDependencies();

    // Note: this is very difficult to test... can't really be automated. But keeping this test here
    // because you can easily test it manually. Run:
    //   npm i axios@1.7.0
    // Then uncomment the following log and then run this command and you'll see info.
    // console.log(JSON.stringify(outdatedDeps, undefined, 4));
    expect(outdatedDeps).toBeInstanceOf(Object);
  });
});
