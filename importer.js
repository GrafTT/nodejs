import EventEmitter from 'events'
import csv from 'csvtojson'

export default class Importer extends EventEmitter {

   async import(path) {
        const jsonArray = await csv().fromFile('./data/products.csv');
        console.log(jsonArray);
    }
}