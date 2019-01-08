import config from "./config/config";

import { User, Product } from "./models";

import DirWatcher from "./dirwatcher";
import Importer from "./importer";

new User();
new Product();

const watcher = new DirWatcher();
const importer = new Importer();

watcher.watch("./data", 1000);
// watcher.on("changed", data => {
//   importer.import(data);
// });
watcher.on("changed", data => {
  importer.importSync(data);
});

console.log(importer.jsonData);
