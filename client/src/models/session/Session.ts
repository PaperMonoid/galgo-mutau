import Group from "../group/Group";

export default interface Session {
  token: string;
  groups: Group[];
}
