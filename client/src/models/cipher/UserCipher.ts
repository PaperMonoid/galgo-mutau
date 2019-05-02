import * as CryptoJS from "crypto-js";
import Cipher from "./Cipher";

export default class UserCipher implements Cipher {
  private key: string;

  constructor(username: string, password: string) {
    this.key = CryptoJS.PBKDF2(password, username + password).toString();
  }

  encipher(message: string): string {
    return CryptoJS.AES.encrypt(message, this.key).toString();
  }

  decipher(message: string): string {
    return CryptoJS.AES.decrypt(message, this.key).toString(CryptoJS.enc.Utf8);
  }
}
