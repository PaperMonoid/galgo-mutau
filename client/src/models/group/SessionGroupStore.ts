import Group from "./Group";
import GroupStore from "./GroupStore";

export default class NetworkGroupStore implements GroupStore {
  all(): Promise<Group[]> {
    return null;
  }
}
