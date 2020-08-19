/**
 * 标签相关Api
 *
 * @author marcher
 */
import BaseApi from '@/api/baseApi';

export default class AdminTagApi extends BaseApi {

  /**
   * get
   */
  public static get(data: any) {
    const url = 'admin/tag/get';
    return super.get(data, url);
  }

  /**
   * listAll
   */
  public static listAll(data: any) {
    const url = 'admin/tag/listAll';
    return super.get(data, url);
  }

  /**
   * query
   */
  public static query(data: any) {
    const url = 'admin/tag/query';
    return super.post(data, url);
  }


  /**
   * add
   */
  public static add(data: any) {
    const url = 'admin/tag/save';
    return super.post(data, url);
  }

  /**
   * update
   */
  public static update(data: any) {
    const url = 'admin/tag/update';
    return super.post(data, url);
  }

  /**
   * remove
   */
  public static remove(data: any) {
    const url = 'admin/tag/remove';
    return super.post(data, url);
  }
}
