/**
 * 文章管理相关Api
 *
 * @author marcher
 */
import BaseApi from '@/api/baseApi';

export default class AdminArticleApi extends BaseApi {

  public static putImg(data: any) {
    const url = '/manage/article/uploadFile';
    return super.postFile(data, url);
  }

  /**
   * 发布文字 - md编辑器
   */
  public static publishMd(data: any) {
    const url = '/manage/article/publish';
    return super.post(data, url);
  }

  /**
   * get
   * @param data
   */
  public static getAsEdit(data: any) {
    const url = '/manage/article/getAsEdit';
    return super.get(data, url);
  }

  /**
   * query
   * @param data
   */
  public static query(data: any) {
    const url = '/manage/article/query';
    return super.post(data, url);
  }

  /**
   * remove
   */
  public static remove(data: any) {
    const url = '/manage/article/remove';
    return super.postForm(data, url);
  }

  /**
   * update 评论设置
   */
  public static comment(data: any) {
    const url = '/manage/article/comment';
    return super.postForm(data, url);
  }

  /**
   * update 置顶设置
   */
  public static top(data: any) {
    const url = '/manage/article/top';
    return super.postForm(data, url);
  }
}
