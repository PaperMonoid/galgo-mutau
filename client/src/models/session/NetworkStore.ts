import Session from "./Session";
import Store from "./Store";
import axios, { AxiosResponse } from "axios";

export default class NetworkStore implements Store {
  private username: string;
  private password: string;
  private tos: boolean;

  constructor(username: string, password: string, tos: boolean) {
    this.username = username;
    this.password = password;
    this.tos = tos;
  }

  fetch(): Promise<Session> {
    const username = this.username;
    const password = this.password;
    const tos = this.tos;
    const params = { username, password, tos };
    if (!tos) {
      return Promise.reject(new Error("Invalid terms of service"));
    }
    return axios
      .post("http://localhost:8080/api/v1/groups", params)
      .then(function(response: AxiosResponse) {
        return { token: response.data.token, groups: response.data.groups };
      })
      .catch(function(response: AxiosResponse) {
        switch (response.status) {
          case 401:
            throw new Error("Invalid credentials");
            break;
          case 400:
            throw new Error("Invalid terms of service");
            break;
          default:
            throw new Error("Unavailable");
            break;
        }
      });
  }

  clear(): Promise<Session> {
    throw TypeError("Object doesn't support property");
  }
}
