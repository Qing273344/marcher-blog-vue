import { _get, _post, _put, _delete} from '@/utils/request';

/**
 * base api
 */
export default class BaseApi {

  /**
   * post 请求
   *
   * @param data  data
   * @param url   url
   */
  protected static post(data: any, url: string) {
    const req = this.reqFrom(data, url);
    return _post(req);
  }

  /**
   * get 请求
   *
   * @param data  data
   * @param url   url
   */
  protected static get(data: any, url: string) {
    const req = this.reqFrom(data, url);
    return _get(req);
  }

  /**
   * put 请求
   *
   * @param data  data
   * @param url   url
   */
  protected static put(data: any, url: string) {
    const req = this.reqFrom(data, url);
    return _put(req);
  }

  /**
   * deleted 请求
   *
   * @param data  data
   * @param url   url
   */
  protected static deleted(data: any, url: string) {
    const req = this.reqFrom(data, url);
    return _delete(req);
  }

  /**
   * 请求信息
   *
   * @param data  数据
   * @param url   url
   */
  protected static reqFrom(data: any, url: string) {
    return {
      data,
      url,
    };
  }
}
