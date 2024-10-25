import { Command } from "commander";
import { OutdatedCommand } from "./command.outdated.class";
import { OutdatedCommandInputArguments } from "./command.outdated.dto";
import { EXIT_CODE_FAILURE } from "./dto";

export function initOutdatedCommand(program: Command) {
  program
    .command("outdated")
    .description(
      `View the CHANGELOG.md from your installed outdated version to the latest`
    )
    .option("--no-toc", "Do not add the TOC, only applies with raw")
    .option("--format <format>", "Output format as json or raw", "raw")
    .option(
      "--cacheDir <dir>",
      "Cache directory when percote downloads packages",
      "/tmp"
    )
    .addHelpText(
      "after",
      `
Examples:

  TODO
`
    )
    .action(async (options: OutdatedCommandInputArguments) => {
      try {
        const command = new OutdatedCommand({
          lookupOptions: {
            cacheDir: options.cacheDir,
          },
        });

        command.run({
          outputFormat: options.format,
          // This is so wild to me. See "Other option types, negatable boolean and boolean|value" onhttps://www.npmjs.com/package/commander.
          // Passing --no-toc results on toc: false. And if your default is false on the option then you can never get to true.
          // The way you get to true is having --no-toc with no default, and then options.toc will be true if --no-toc is not passed.
          // Makes sense when you know it.
          toc: options.toc,
        });
      } catch (e) {
        if (e instanceof Error) {
          console.error(`ERROR: ${e.message}`);
        }
        process.exit(EXIT_CODE_FAILURE);
      }
    });
}
