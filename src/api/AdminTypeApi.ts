/**
 * 标签相关Api
 *
 * @author marcher
 */
import BaseApi from '@/api/BaseApi';

export default class AdminTypeApi extends BaseApi {

  /**
   * get
   */
  public static get(data: any) {
    const url = '/manage/type/get';
    return super.get(data, url);
  }

  /**
   * listAll
   */
  public static listAll(data: any) {
    const url = '/manage/type/listAll';
    return super.get(data, url);
  }

  /**
   * query
   */
  public static query(data: any) {
    const url = '/manage/type/query';
    return super.post(data, url);
  }


  /**
   * add
   */
  public static add(data: any) {
    const url = '/manage/type/save';
    return super.post(data, url);
  }

  /**
   * update
   */
  public static update(data: any) {
    const url = '/manage/type/update';
    return super.post(data, url);
  }

  /**
   * remove
   */
  public static remove(data: any) {
    const url = '/manage/type/remove';
    return super.post(data, url);
  }
}
