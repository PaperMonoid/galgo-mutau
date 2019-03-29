export default interface Cipher {
  encipher(message: string): string;
  decipher(message: string): string;
}
