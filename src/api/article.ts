import BaseApi from '@/api/baseApi';

/**
 * 文章Api
 */
export default class ArticleApi extends BaseApi {

  /**
   * 发布文字 - md编辑器
   */
  public static publishMd(data: any) {
    const url = 'blog/article/publish';
    return super.post(data, url);
  }

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
    const url = 'blog/article/get';
    return super.get(data, url);
  }
}
