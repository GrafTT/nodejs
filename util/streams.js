#!/usr/bin/env node

const yargs = require("yargs");
const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");

let argv = yargs.options({
  a: {
    alias: "action",
    demandOption: true,
    describe: "Action you want to go",
    type: "string",
    choices: [
      "transform",
      "reverse",
      "outputFile",
      "transformToFile",
      "transformFromFile",
      "cssBundler"
    ]
  }
}).argv;

if (argv.a === "transform") {
  process.stdin.on("data", function(data) {
    process.stdout.write(data.toString().toUpperCase());
  });
}
if (argv.a === "reverse") {
  process.stdin.on("data", function(data) {
    process.stdout.write(
      data
        .toString()
        .split("")
        .reverse()
        .join("")
    );
  });
}

if (argv.a === "outputFile") {
  yargs.option({
    f: {
      alias: "file",
      demandOption: true,
      describe: "File you want to read data"
    }
  });
  if (!argv.f || !(typeof argv.f === "string")) {
    console.error("Additional option --file(-f) is required", __dirname);
  } else {
    let readStream = fs.createReadStream(`${__dirname}/${argv.f}`, "utf8");

    readStream.on("error", function(err) {
      if (err.code == "ENOENT") {
        console.log("File not Found!");
      } else {
        console.error(err);
      }
    });
    readStream.pipe(process.stdout);
  }
}

if (argv.a === "transformFromFile") {
  yargs.option({
    f: {
      alias: "file",
      demandOption: true,
      describe: "File you want to convert data"
    }
  });
  if (!argv.f || !(typeof argv.f === "string")) {
    console.error("Additional option --file(-f) is required", __dirname);
  } else {
    async function imp(path) {
      const jsonArray = await csv().fromFile(path);
      process.stdout.write(jsonArray.toString());
    }
    imp(`${__dirname}/${argv.f}`);
  }
}

if (argv.a === "transformToFile") {
  yargs.option({
    f: {
      alias: "file",
      demandOption: true,
      describe: "File you want to convert data"
    }
  });
  if (!argv.f || !(typeof argv.f === "string")) {
    console.error("Additional option --file(-f) is required", __dirname);
  } else {
    let readStream = fs.createReadStream(`${__dirname}/${argv.f}`);
    let writeStream = fs.createWriteStream(`${__dirname}/result.json`);
    readStream.pipe(csv()).pipe(writeStream);
    readStream.on("error", function(err) {
      if (err.code == "ENOENT") {
        console.log("File not Found!");
      } else {
        console.error(err);
      }
    });
  }
}

if (argv.a === "cssBundler") {
  yargs.option({
    p: {
      alias: "path",
      demandOption: true,
      describe: "Directory with css files"
    }
  });
  if (!argv.p || !(typeof argv.p === "string")) {
    console.error("Additional option --path(-p) is required", __dirname);
  } else {
    const css = `
.ngmp18 {
  background-color: #fff;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
}

.ngmp18__hw3 {
  color: #333;
}

.ngmp18__hw3--t7 {
  font-weight: bold;
}`;
    fs.readdir(argv.p, (err, items) => {
      if (err) {
        if (err.code == "ENOENT") {
          console.log("Path not Found!");
        } else {
          console.error(err);
        }
      } else {
        items.forEach(item => {
          if (path.parse(item).name === "bundle") {
            fs.writeFileSync(`${argv.p}/bundle.css`, "");
          }
        });
        items.forEach(item => {
          if (path.parse(item).ext === ".css") {
            let readFile = fs.readFileSync(`${argv.p}/${item}`, "utf8");
            fs.appendFileSync(
              `${argv.p}/bundle.css`,
              `\n${readFile}`,
              "utf8",
              err => {
                if (err) throw err;
                console.log("Data has been added to the end of file");
              }
            );
          }
        });
        fs.appendFileSync(`${argv.p}/bundle.css`, `\n${css}`, "utf8", err => {
          if (err) throw err;
          console.log("Data has been added to the end of file");
        });
      }
    });
  }
}

yargs.help("help").alias("help", "h");
