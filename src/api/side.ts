import BaseApi from '@/api/baseApi';

export default class SideApi extends BaseApi {

  /**
   * get 热门标签
   */
  public static getHotTag(data: any) {
    const url = 'blog/tag/getHotTag';
    return super.get(data, url);
  }
}
