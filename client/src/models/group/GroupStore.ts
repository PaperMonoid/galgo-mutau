import Group from "./Group";

export default interface GroupStore {
  all(): Promise<Group[]>;
}
