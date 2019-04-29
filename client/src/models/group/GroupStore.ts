import Group from "./Group";
import GroupResponse from "./GroupResponse";

export default interface GroupStore {
  all(): Promise<GroupResponse>;
}
