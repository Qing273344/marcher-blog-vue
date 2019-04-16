import BaseApi from '@/api/baseApi';

export default class Logout extends BaseApi {

  /**
   * 登出
   */
  public static logout(data: any) {
    const url = 'blog/passport/logout';
    return super.post(data, url);
  }

}
