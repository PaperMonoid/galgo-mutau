import Group from "./Group";
import GroupStore from "./GroupStore";
import GroupResponse from "./GroupResponse";
import UserCipher from "../cipher/UserCipher";

export default class LocalGroupStore implements GroupStore {
  private cipher: UserCipher;
  private store: GroupStore;
  private username: string;
  private password: string;

  constructor(username: string, password: string, store: GroupStore) {
    this.username = username;
    this.password = password;
    this.store = store;
  }

  all(): Promise<GroupResponse> {
    let cache = localStorage.getItem(this.username);
    if (cache) {
      return Promise.resolve(JSON.parse(this.cipher.decipher(cache)));
    } else {
      return this.store.all().then(
        function(response: GroupResponse) {
          cache = this.cipher.encipher(JSON.stringify(response));
          localStorage.setItem(this.username, cache);
          return response;
        }.bind(this)
      );
    }
  }
}
