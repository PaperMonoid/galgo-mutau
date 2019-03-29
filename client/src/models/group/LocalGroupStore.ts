import Group from "./Group";
import GroupStore from "./GroupStore";

export default class LocalGroupStore implements GroupStore {
  all(): Promise<Group[]> {
    return null;
  }
}
