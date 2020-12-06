import BaseApi from '@/api/BaseApi';

export default class AdminPassportApi extends BaseApi {

  /**
   * 注册
   */
  public static register(data: any) {
    const url = '/manage/passport/register';
    return super.post(data, url);
  }

  /**
   * 登录
   */
  public static login(data: any) {
    const url = '/manage/passport/login';
    return super.post(data, url);
  }

  /**
   * 登出
   */
  public static logout(data: any) {
    const url = '/manage/passport/logout';
    return super.post(data, url);
  }
}
