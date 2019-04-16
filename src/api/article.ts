import BaseApi from '@/api/baseApi';

/**
 * 文章Api
 */
export default class ArticleApi extends BaseApi {

  /**
   * query 文章列表
   */
  public static query(data: any) {
    const url = 'blog/article/query';
    return super.post(data, url);
  }

  /**
   * 文章详情
   */
  public static details(data: any) {
    const url = 'blog/article/details';
    return super.get(data, url);
  }

  /**
   * 文章点赞
   */
  public static liked(data: any) {
    const url = 'blog/article/liked';
    return super.fromPost(data, url);
  }
}
