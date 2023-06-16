import fs from "fs";
import path from "path";
import crlf from "crlf";

export async function readModels() {
  const schemas: Record<string, string> = {};

  const __rootModelsDirname = `${process.cwd()}/models`;
  const rootModels = fs.readdirSync(__rootModelsDirname);

  await Promise.all(
    rootModels.map(async (fileName) => {
      if (fileName === "fs" || fileName === "toolkits") {
        return;
      }

      const endingType = await new Promise((resolve) => {
        crlf.get(
          `${__rootModelsDirname}/${fileName}`,
          null,
          function (err, endingType) {
            resolve(endingType);
          }
        );
      });

      if (endingType === "CRLF") {
        await new Promise((resolve) => {
          crlf.set(`${__rootModelsDirname}/${fileName}`, "LF", function () {
            resolve("");
          });
        });
      }

      const filePath = path.resolve(__rootModelsDirname, fileName);
      if (fs.statSync(filePath).isFile()) {
        schemas[fileName] = fs
          .readFileSync(filePath, { encoding: "utf8" })
          //@ts-ignore
          .replaceAll("\n", "");
      }
    })
  );

  const __toolkitsModelsDirname = `${process.cwd()}/models/toolkits`;
  const toolkitsModels = fs.readdirSync(__toolkitsModelsDirname);

  await Promise.all(
    toolkitsModels.map(async (fileName) => {
      const endingType = await new Promise((resolve) => {
        crlf.get(
          `${__toolkitsModelsDirname}/${fileName}`,
          null,
          function (err, endingType) {
            resolve(endingType);
          }
        );
      });

      if (endingType === "CRLF") {
        await new Promise((resolve) => {
          crlf.set(`${__toolkitsModelsDirname}/${fileName}`, "LF", function () {
            resolve("");
          });
        });
      }

      const filePath = path.resolve(__toolkitsModelsDirname, fileName);
      if (fs.statSync(filePath).isFile()) {
        schemas[fileName] = fs
          .readFileSync(filePath, { encoding: "utf8" })
          //@ts-ignore
          .replaceAll("\n", "");
      }
    })
  );
  
  return schemas;
}

export function writeToOutput(val: object | string) {
  const filePath = path.resolve(`${process.cwd()}/output`, "app.json");
  fs.writeFileSync(filePath, JSON.stringify(val));
}
