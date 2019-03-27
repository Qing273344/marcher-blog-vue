/**
 * 文章管理相关Api
 */
import BaseApi from '@/api/baseApi';

export default class AdminArticleApi extends BaseApi {

  /**
   * get
   * @param data
   */
  public static get(data: any) {
    const url = 'admin/article/get';
    return super.get(data, url);
  }

  /**
   * query
   * @param data
   */
  public static query(data: any) {
    const url = 'admin/article/query';
    return super.post(data, url);
  }

  /**
   * remove
   */
  public static remove(data: any) {
    const url = 'admin/article/remove';
    return super.post(data, url);
  }
}
