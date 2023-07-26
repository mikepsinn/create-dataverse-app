import chalk from "chalk";
import fs from "fs-extra";
import { Command } from "commander"; // (normal include)
import { init } from "./init/index.js";
import { deploy } from "./deploy/index.js";
import { update } from "./update/index.js";
import { generateKeyPair } from "./keypair/index.js";

const packageJson = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url)).toString(),
);

const program = new Command();

program
  .name("dataverseos")
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command("init")
  .description("Init dataverse project.")
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action((projectName: string) => {
    init(projectName, packageJson);
  });

program
  .command("deploy")
  .description("Deloy a dataverse project.")
  .action(() => {
    deploy();
  });

program
  .command("update")
  .description("Update an exsiting dataverse project.")
  .action(() => {
    update();
  });

program
  .command("keypair")
  .description("Generate private key pair.")
  .action(() => {
    generateKeyPair();
  });

program.parse();
