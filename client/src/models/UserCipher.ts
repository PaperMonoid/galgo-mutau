import * as CryptoJS from "crypto-js";
import Cipher from "./Cipher";

export default class UserCipher implements Cipher {
  private key: string;

  constructor(username: string, password: string) {
    this.key = CryptoJS.PBKDF2(
      CryptoJS.enc.Utf8.parse(password),
      CryptoJS.enc.Utf8.parse(username + password)
    ).toString(CryptoJS.enc.Utf8);
  }

  encipher(message: string): string {
    return CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(message),
      CryptoJS.enc.Utf8.parse(this.key)
    ).toString(CryptoJS.enc.Utf8);
  }

  decipher(message: string): string {
    return CryptoJS.AES.decrypt(
      CryptoJS.enc.Utf8.parse(message),
      CryptoJS.enc.Utf8.parse(this.key)
    ).toString(CryptoJS.enc.Utf8);
  }
}
