import Group from "./Group";
import GroupStore from "./GroupStore";

export default class LocalGroupStore extends GroupStore {
  all(): Promise<Group[]> {
    return null;
  }
}
