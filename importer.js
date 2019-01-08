import EventEmitter from "events";
import csv from "csvtojson";
import fs from "fs";

export default class Importer {
  constructor() {
    this.jsonData = [];
  }
  async import(path) {
    const jsonArray = await csv().fromFile(`./${path}`);
    console.log(jsonArray);
    this.jsonData = jsonArray;
  }
  importSync(path) {
    fs.readFile(path, 'utf8', (err, data) => {
      console.log(data.split(/\r?\n/))
    })
    
  }
}
