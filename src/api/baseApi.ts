import { _get, _post, _put, _delete, _fromPost, _filePost } from '@/utils/request';

/**
 * base api
 */
export default class BaseApi {

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
   * post 请求 from表单
   *
   * @param data  data
   * @param url   url
   */
  protected static fromPost(data: any, url: string) {
    const req = this.reqFrom(data, url);
    return _fromPost(req);
  }

  /**
   * post 请求 file上传
   *
   * @param data  data
   * @param url   url
   */
  protected static filePost(data: any, url: string) {
    const req = this.reqFrom(data, url);
    return _filePost(req);
  }

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
