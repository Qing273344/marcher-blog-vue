import BaseApi from '@/api/baseApi';

/**
 * 注册Api
 */
export default class RegisterApi extends BaseApi {

  /**
   * 注册
   */
  public static register(data: any) {
    const url = '/blog/passport/register';
    return super.post(data, url);
  }
}
