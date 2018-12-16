import config from './config/config'

import {User, Product} from './models'

import DirWatcher from './dirwatcher'
import Importer from './importer'

console.log(config.name)

new User()
new Product()

const watcher = new DirWatcher();
const importer = new Importer();

watcher.watch();
watcher.on('changed', (data) => {
  importer.import(`${__dirname}\\${data}`);
})
