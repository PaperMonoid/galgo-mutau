import GroupStore from "./GroupStore";
import NetworkGroupStore from "./NetworkGroupStore";
import LocalGroupStore from "./LocalGroupStore";
import SessionGroupStore from "./SessionGroupStore";

export default class GroupStoreFactory {
  static fromNetwork(
    username: string,
    password: string,
    tos: boolean
  ): GroupStore {
    const network = new NetworkGroupStore(username, password, tos);
    const local = new LocalGroupStore(username, password, network);
    const session = new SessionGroupStore(local);
    return session;
  }
}
