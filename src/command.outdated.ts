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
        });
      } catch (e) {
        if (e instanceof Error) {
          console.error(`ERROR: ${e.message}`);
        }
        process.exit(EXIT_CODE_FAILURE);
      }
    });
}
