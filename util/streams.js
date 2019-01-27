#!/usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');
const csv = require("csvtojson");

let argv = yargs
  .options({
    'a': {
      alias: 'action',
      demandOption: true,
      describe: 'Action you want to go',
      type: 'string',
      choices: ['transform', 'reverse', 'outputFile', 'transformToFile', 'transformFromFile'],

    }
  })
  .argv;

if (argv.a === 'transform') {
  process.stdin.on('data', function (data) {
    process.stdout.write(data.toString().toUpperCase())
  })
}
if (argv.a === 'reverse') {
  process.stdin.on('data', function (data) {
    process.stdout.write(data.toString().split('').reverse().join(''))
  })
  // process.stdout.write(argv._.join(' '))
}

if (argv.a === 'outputFile') {
  yargs.option({
    'f': {
      alias: 'file',
      demandOption: true,
      describe: 'File you want to read data'
    }
  })
  if (!argv.f || !(typeof argv.f === 'string')) {
    console.error('Additional option --file(-f) is required', __dirname)
  } else {

    let readStream = fs.createReadStream(`${__dirname}/${argv.f}`, 'utf8');

    // readStream.on('data', function(chunk) {
    //   process.stdout.write(chunk)
    // })
    readStream.on('error', function (err) {
      if (err.code == 'ENOENT') {
        console.log("File not Found!");
      } else {
        console.error(err);
      }
    });
    readStream.pipe(process.stdout);
  }
}

if (argv.a === 'transformFromFile') {
  yargs.option({
    'f': {
      alias: 'file',
      demandOption: true,
      describe: 'File you want to convert data'
    }
  })
  if (!argv.f || !(typeof argv.f === 'string')) {
    console.error('Additional option --file(-f) is required', __dirname)
  } else {
    async function imp(path) {
      const jsonArray = await csv().fromFile(path);
      // console.log(jsonArray)
      process.stderr.write(jsonArray.toString());
    }
    imp(`${__dirname}/${argv.f}`)
    
  }
}

yargs.help('help').alias('help', 'h');