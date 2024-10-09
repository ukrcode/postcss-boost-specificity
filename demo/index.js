// Demo plugin usage
// you can find it's result in dist folder

const postcss = require("postcss");
const path = require("path");
const boostSpecificityPlugin = require("../lib/boost-specificity");
const { readFile, open } = require("fs/promises");
const chalkPromise = import("chalk").then((chalkModule) => chalkModule.default);

const projectRoot = path.resolve(__dirname, "../");
const inputPathBasis = "demo/test.css";
const outputPathBasis = "demo/results/test.result.css";

const inputPath = path.join(projectRoot, inputPathBasis);
const outputPath = path.join(projectRoot, outputPathBasis);

const demoStartMessage = `Starting processing the "${inputPathBasis}"`;
const demoEndMessafe = `Finished the file processing, check the "${outputPathBasis}" file`;

demoRun();

async function demoRun() {
  // We read CSS from file, you can edit it to try your code
  const testCssString = await readTextFile(inputPath);

  // postcss process it and returns a string
  const result = await postcss([boostSpecificityPlugin]).process(
    testCssString,
    {
      from: inputPath,
      to: outputPath,
    }
  );

  // After that we save it to the file
  // We ignore it from GIT, to make it possible to play with it
  // a little bit
  await saveFile(outputPath, result.css);
}

async function readTextFile(filePath) {
  let fileString = "";

  try {
    fileString = await readFile(filePath, { encoding: "utf8" });
  } catch(error) {
    console.error(error);
  }

  return fileString;
}

async function saveFile(filePath, contentString) {
  await showMessage(demoStartMessage);
  const fileHandle = await open(filePath, "w");
  await showMessage("...processing");

  await fileHandle.write(contentString);
  await fileHandle.close();

  await showMessage(demoEndMessafe);
}

async function showMessage(messageText) {
  const wrappedMessageText = `     ${messageText}`;
  const chalk = await chalkPromise;

  const chalkMessage = chalk.bold.magenta;

  console.log(chalkMessage(wrappedMessageText));
}
