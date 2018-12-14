import config from './config/config'

import {User, Product} from './models'

import watcher from './dirwatcher'

console.log(config.name)

new User()
new Product()

let w = new watcher();

w.watch();