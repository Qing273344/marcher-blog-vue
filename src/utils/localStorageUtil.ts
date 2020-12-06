/**
 * localStorageUtil
 */
export default class LocalStorageUtil {

  public static USER_INFO = 'user_info';
  public static USER_BEARER = 'user_bearer';

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
