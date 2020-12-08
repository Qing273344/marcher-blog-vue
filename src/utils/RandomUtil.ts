/**
 * 随机数工具类
 *
 * @author marcher
 */
export default class RandomUtil {

  public static guid() {
    return (RandomUtil.S4() + RandomUtil.S4() + '-' + RandomUtil.S4() + '-' + RandomUtil.S4() + '-' +
      RandomUtil.S4() + '-' + RandomUtil.S4() + RandomUtil.S4() + RandomUtil.S4());
  }

  private static S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }
}
