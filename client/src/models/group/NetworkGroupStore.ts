import Group from "./Group";
import GroupStore from "./GroupStore";
import GroupResponse from "./GroupResponse";
import GroupResponseError from "./GroupResponseError";
import axios, { AxiosResponse } from "axios";

export default class NetworkGroupStore implements GroupStore {
  private username: string;
  private password: string;
  private tos: boolean;
  private token: string;

  constructor(username: string, password: string, tos: boolean) {
    this.username = username;
    this.password = password;
    this.tos = tos;
    this.token = "";
  }

  all(): Promise<GroupResponse> {
    const username = this.username;
    const password = this.password;
    const tos = this.tos;
    return axios
      .post("http://localhost:8080/api/v0/groups", {
        username,
        password,
        tos
      })
      .then(function(response: AxiosResponse) {
        console.log(response.data);
        return { token: response.data.token, groups: response.data.groups };
      })
      .catch(function(response: AxiosResponse) {
        console.log(response.status);
        switch (response.status) {
          case 401:
            throw GroupResponseError.InvalidCredentials;
            break;
          case 400:
            throw GroupResponseError.InvalidTos;
            break;
          default:
            throw GroupResponseError.Unavailable;
            break;
        }
      });
  }
}
