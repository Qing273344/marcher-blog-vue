import { postFile, postForm, get, post } from '@/utils/request';
import { RequestBean } from '@/bean/common/RequestBean';

/**
 * base api
 *
 * @author marcher
 */
export default class BaseApi {

  /**
   * post 请求
   *
   * @param data  data
   * @param url   url
   */
  protected static post(data: any, url: string) {
    const reqs = this.wrapperReqs(data, url);
    return post(reqs);
  }

  /**
   * get 请求
   *
   * @param data  data
   * @param url   url
   */
  protected static get(data: any, url: string) {
    const reqs = this.wrapperReqs(data, url);
    return get(reqs);
  }

  /**
   * post 请求 from表单
   *
   * @param data  data
   * @param url   url
   */
  protected static postForm(data: any, url: string) {
    const reqs = this.wrapperReqs(data, url);
    return postForm(reqs);
  }

  /**
   * post 请求 file上传
   *
   * @param data  data
   * @param url   url
   */
  protected static postFile(data: any, url: string) {
    const reqs = this.wrapperReqs(data, url);
    return postFile(reqs);
  }

  /**
   * 请求信息
   *
   * @param data  数据
   * @param url   url
   */
  protected static wrapperReqs(data: any, url: string) {
    return new RequestBean(url, data);
  }
}
