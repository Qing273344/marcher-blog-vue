import { filePost, formPost, get, post } from '@/utils/request';

/**
 * base api
 *
 * @author marcher
 */
export default class BaseApi {

  /**
   * get 请求
   *
   * @param data  data
   * @param url   url
   */
  protected static get(data: any, url: string) {
    const req = this.reqForm(data, url);
    // return RequestUtil.get(req);
    return get(req);
  }

  /**
   * post 请求 from表单
   *
   * @param data  data
   * @param url   url
   */
  protected static fromPost(data: any, url: string) {
    const req = this.reqForm(data, url);
    // return RequestUtil.form(req);
    return formPost(req);
  }

  /**
   * post 请求 file上传
   *
   * @param data  data
   * @param url   url
   */
  protected static filePost(data: any, url: string) {
    const req = this.reqForm(data, url);
    return filePost(req);
  }

  /**
   * post 请求
   *
   * @param data  data
   * @param url   url
   */
  protected static post(data: any, url: string) {
    const req = this.reqForm(data, url);
    // return RequestUtil.json(req);
    return post(req);
  }

  /**
   * 请求信息
   *
   * @param data  数据
   * @param url   url
   */
  protected static reqForm(data: any, url: string) {
    return {
      data,
      url,
    };
  }
}
