import Session from "./Session";
import NetworkStore from "./NetworkStore";
import LocalStore from "./LocalStore";
import SessionStore from "./SessionStore";

export default class SessionFactory {
  static createEmpty(): Promise<Session> {
    try {
      const session = new SessionStore(null);
      return session.clear();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static createDefault(): Promise<Session> {
    try {
      const session = new SessionStore(null);
      return session.fetch();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static createFromNetwork(
    username: string,
    password: string,
    tos: boolean
  ): Promise<Session> {
    const network = new NetworkStore(username, password, tos);
    const local = new LocalStore(username, password, tos, network);
    const session = new SessionStore(local);
    return session.fetch();
  }
}
