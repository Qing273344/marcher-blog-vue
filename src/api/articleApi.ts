import BaseApi from '@/api/baseApi';

/**
 * 文章Api
 *
 * @author marcher
 */
export default class ArticleApi extends BaseApi {

  /**
   * query 文章列表
   */
  public static query(data: any) {
    const url = '/article/query';
    return super.post(data, url);
  }

  /**
   * 文章详情
   */
  public static detail(data: any) {
    const url = '/article/detail';
    return super.get(data, url);
  }

  /**
   * 文章点赞
   */
  public static liked(data: any) {
    const url = '/article/liked';
    return super.postForm(data, url);
  }
}
