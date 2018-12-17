import EventEmitter from "events";
import fs from "fs";

export default class DirWatcher extends EventEmitter {
  watch(path, delay) {
    fs.watch(path, (e, filename) => {
      this.emit("changed", `${path}/${filename}`);
    });
  }
}
