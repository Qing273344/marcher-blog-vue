/**
 * 标签相关Api
 */
import BaseApi from '@/api/baseApi';

export default class AdminTagApi extends BaseApi {

  /**
   * get
   */
  public static get(data: any) {
    const url = 'blog/tag/get';
    return super.get(data, url);
  }

  /**
   * listAll
   */
  public static listAll(data: any) {
    const url = 'blog/tag/listAll';
    return super.get(data, url);
  }

  /**
   * query
   */
  public static query(data: any) {
    const url = 'blog/tag/query';
    return super.post(data, url);
  }


  /**
   * add
   */
  public static add(data: any) {
    const url = 'blog/tag/save';
    return super.post(data, url);
  }

  /**
   * update
   */
  public static update(data: any) {
    const url = 'blog/tag/update';
    return super.post(data, url);
  }

  /**
   * remove
   */
  public static remove(data: any) {
    const url = 'blog/tag/remove';
    return super.post(data, url);
  }
}
