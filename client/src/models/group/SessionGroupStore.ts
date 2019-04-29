import Group from "./Group";
import GroupStore from "./GroupStore";
import GroupResponse from "./GroupResponse";

export default class SessionGroupStore implements GroupStore {
  private store: GroupStore;

  constructor(store: GroupStore) {
    this.store = store;
  }

  all(): Promise<GroupResponse> {
    let cache = sessionStorage.getItem("user");
    if (cache) {
      return Promise.resolve(JSON.parse(cache));
    } else {
      return this.store.all().then(
        function(response: GroupResponse) {
          cache = JSON.stringify(response);
          sessionStorage.setItem("user", cache);
          return response;
        }.bind(this)
      );
    }
  }
}
