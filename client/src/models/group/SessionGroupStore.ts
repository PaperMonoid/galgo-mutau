import Group from "./Group";
import GroupStore from "./GroupStore";

export default class NetworkGroupStore extends GroupStore {
  all(): Promise<Group[]> {
    return null;
  }
}
