/**
 * 标签相关Api
 */
import BaseApi from '@/api/baseApi';

export default class AdminTypeAPi extends BaseApi {

  /**
   * get
   */
  public static get(data: any) {
    const url = 'blog/type/get';
    return super.get(data, url);
  }

  /**
   * listAll
   */
  public static listAll(data: any) {
    const url = 'blog/type/listAll';
    return super.get(data, url);
  }

  /**
   * query
   */
  public static query(data: any) {
    const url = 'blog/type/query';
    return super.post(data, url);
  }


  /**
   * add
   */
  public static add(data: any) {
    const url = 'blog/type/save';
    return super.post(data, url);
  }

  /**
   * update
   */
  public static update(data: any) {
    const url = 'blog/type/update';
    return super.post(data, url);
  }

  /**
   * remove
   */
  public static remove(data: any) {
    const url = 'blog/type/remove';
    return super.post(data, url);
  }
}
