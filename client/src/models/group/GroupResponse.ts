import Group from "./Group";

export default interface GroupResponse {
  token: string;
  groups: Group[];
}
