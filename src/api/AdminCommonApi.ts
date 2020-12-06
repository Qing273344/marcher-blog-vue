/**
 * common 相关Api
 *
 * @author marcher
 */
import BaseApi from '@/api/BaseApi';

export default class AdminCommonApi extends BaseApi {

  /**
   * oss 签名
   *
   * @param data
   */
  public static ossSignature(data: any) {
    const url = '/manage/common/ossSignature';
    return super.get(data, url);
  }
}
