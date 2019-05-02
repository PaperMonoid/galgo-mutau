import Session from "./Session";

export default interface Store {
  fetch(): Promise<Session>;
  clear(): Promise<Session>;
}
