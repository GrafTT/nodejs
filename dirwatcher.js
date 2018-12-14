import EventEmitter from 'events'
import fs from 'fs'

export default class DirWatcher extends EventEmitter{

    watch() {
        fs.watch('./data', (e, filename)=>{
            console.log(e)
        })
    }
}