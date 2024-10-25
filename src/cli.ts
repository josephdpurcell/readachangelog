#!/usr/bin/env node

import { Command } from "commander";
import { initOutdatedCommand } from "./command.outdated";
import { initViewCommand } from "./command.view";
import { COMMAND_NAME, COMMAND_VERSION } from "./dto";

const program = new Command();

program
  .name(COMMAND_NAME)
  .version(COMMAND_VERSION)
  .description("Keep a changelog? Read a changelog.");

// TODO: there has to be a better way
initViewCommand(program);
initOutdatedCommand(program);

program.parse();
