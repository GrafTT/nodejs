#!/usr/bin/env node
const yargs = require('yargs') ;

  let argv = yargs.argv;
 
  if(argv.a === 'outputFile' || argv.action==='outputFile') {
    if(!(argv.file || argv.f)) {
      console.error('no file')
    }
  } else if(argv.a === 'transformToFile' || argv.action === 'transformToFile') {

  }else if(argv.a === 'transform' || argv.action === 'transform') {

  } else if(argv.a === 'transformFromFile' || argv.action === 'transformFromFile') {

  }else if(argv.a === 'reverse' || argv.action === 'reverse') {

  } else if(argv.a === 'cssBundler' || argv.action === 'cssBundler') {

  } else {

  }
console.log(argv)






