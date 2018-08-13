export default class Event {
  constructor() {
    this.handlers = {};
    this.autoKey = 0;
  }

  register(handler) {
    var id = this.autoKey++;
    this.handlers[id] = handler;
    return id;
  }

  unregister(id) {
    delete this.handlers[id];
  }

  fire(args) {
    for (var h in this.handlers) {
      this.handlers[h].apply(args);
    }
  }
}
