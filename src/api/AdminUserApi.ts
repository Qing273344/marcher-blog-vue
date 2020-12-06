import BaseApi from '@/api/BaseApi';

export default class AdminUserApi extends BaseApi {

  /**
   * 用户信息
   */
  public static userInfo() {
    const url = '/manage/user/info';
    return super.get(null, url);
  }

}
