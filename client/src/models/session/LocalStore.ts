import Session from "./Session";
import Store from "./Store";
import UserCipher from "../cipher/UserCipher";

export default class LocalStore implements Store {
  private cipher: UserCipher;
  private username: string;
  private tos: boolean;
  private store: Store;

  constructor(username: string, password: string, tos: boolean, store: Store) {
    this.cipher = new UserCipher(username, password);
    this.username = username;
    this.tos = tos;
    this.store = store;
  }

  fetch(): Promise<Session> {
    const tos = this.tos;
    if (!tos) {
      return Promise.reject(new Error("Invalid terms of service"));
    }
    let cache = localStorage.getItem(this.username);
    if (cache) {
      try {
        return Promise.resolve(JSON.parse(this.cipher.decipher(cache)));
      } catch (e) {
        return Promise.reject(new Error("Invalid credentials"));
      }
    } else {
      return this.store.fetch().then(this.save);
    }
  }

  save = (session: Session) => {
    let cache = this.cipher.encipher(JSON.stringify(session));
    localStorage.setItem(this.username, cache);
    return session;
  };

  clear(): Promise<Session> {
    let cache = localStorage.getItem(this.username);
    if (cache) {
      return Promise.resolve(JSON.parse(this.cipher.decipher(cache))).then(
        this.remove
      );
    } else {
      return this.store.clear().then(this.remove);
    }
  }

  remove = (session: Session) => {
    localStorage.removeItem(this.username);
    return session;
  };
}
