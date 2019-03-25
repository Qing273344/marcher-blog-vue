import BaseApi from '@/api/baseApi';

export default class LoginApi extends BaseApi {

  /**
   * 登录
   */
  public static login(data: any) {
    const url = 'blog/passport/login';
    return super.post(data, url);
  }

  /**
   * 用户信息
   */
  public static userInfo() {
    const url = 'blog/user/info';
    return super.get(null, url);
  }
}
