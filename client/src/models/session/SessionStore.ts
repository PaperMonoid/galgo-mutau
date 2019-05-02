import Session from "./Session";
import Store from "./Store";

export default class SessionStore implements Store {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  fetch(): Promise<Session> {
    let cache = sessionStorage.getItem("user");
    if (cache) {
      return Promise.resolve(JSON.parse(cache));
    } else {
      return this.store.fetch().then(this.save);
    }
  }

  save = (session: Session) => {
    let cache = JSON.stringify(session);
    sessionStorage.setItem("user", cache);
    return session;
  };

  clear(): Promise<Session> {
    let cache = sessionStorage.getItem("user");
    if (cache) {
      return Promise.resolve(JSON.parse(cache)).then(this.remove);
    } else {
      return this.store.clear().then(this.remove);
    }
  }

  remove = (session: Session) => {
    sessionStorage.removeItem("user");
    return session;
  };
}
