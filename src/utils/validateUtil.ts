/**
 * 校验util
 */
export default class ValidateUtil {

  /**
   * 校验密码
   * @param str 密码
   */
  public static validatePassword(str: string) {
    const reg = /^[\w_-]{6,16}$/;
    return reg.test(str);
  }

  /**
   * 是否都是字母
   * @param str 待校验字符
   */
  public static validatAlphabets(str: string) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
  }
}
