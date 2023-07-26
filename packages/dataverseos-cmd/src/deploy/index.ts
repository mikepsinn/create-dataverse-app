import chalk from "chalk";
import { writeToOutput } from "../base/tools.js";
import { createDapp } from "@dataverse/dapp-table-client";
import { getMutateDappProps } from "../base/index.js";
import { CreateDappProps, Operation } from "../base/types.js";

export const deploy = async () => {
  const createProps = (await getMutateDappProps(
    Operation.Create,
  )) as CreateDappProps;

  console.log(`📡 Creating ${chalk.blueBright(createProps.input.name)}...`);

  let createRes;
  try {
    createRes = await createDapp(createProps);
  } catch (error: any) {
    console.error(error?.response?.errors?.[0] ?? error);
    throw error;
  }

  console.log(
    chalk.green(
      `✅ Create successfully, dapp-id is ${chalk.blue(createRes.id)}`,
    ),
  );

  try {
    writeToOutput(createRes);
  } catch (error) {
    console.log("🚨 Failed to write to output directory.");
    throw error;
  }

  console.log(
    `✨ You can check the dapp info in ${chalk.green("output/app.json")}`,
  );
  console.log();
};
