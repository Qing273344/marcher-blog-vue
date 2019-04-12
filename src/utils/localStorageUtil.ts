/**
 * localStorageUtil
 */
export default class LocalStorageUtil {

  public static USER_INFO = 'USER_INFO';

  /**
   * get
   */
  public static getItem(key: string) {
    return localStorage.getItem(key);
  }

  /**
   * set
   */
  public static setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  /**
   * remove
   */
  public static removeItem(key: string) {
    return localStorage.removeItem(key);
  }
}
