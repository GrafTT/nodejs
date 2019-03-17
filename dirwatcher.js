import EventEmitter from "events";
import chokidar from "chokidar";

export default class DirWatcher extends EventEmitter {
  watch(path, delay) {
    const w = chokidar.watch(path, {persistent: true});
    w.on('change', p => {
      this.emit("changed", p);
    });
  }
}
