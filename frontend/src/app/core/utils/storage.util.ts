export default class Storage {

  static saveSessionStorage(name: string, value: string) {
    sessionStorage.setItem(name, value);
  }

  static deleteSessionStorage(name: string) {
    sessionStorage.removeItem(name);
  }

  static getItem(key: string, local: boolean = false): string | any{
    if(!local) {
      return sessionStorage.getItem(key);
    }
    return localStorage.getItem(key);
  }

  static saveLocalStorage(name: string, value: string | boolean) {
    localStorage.setItem(name, value.toString());
  }

  static deleteLocalStorage(name: string) {
    localStorage.removeItem(name);
  }

}
