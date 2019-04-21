/**
 * 查询参数(分页)
 *
 * @author marcher
 */
import PageUtil from '@/utils/pageUtil';

export default class QueryPage {
  public curPage: number = 1;
  public limit: number = 10;

  constructor();
  constructor(curPage: number, limit: number);
  constructor(curPage?: number, limit?: number) {
    curPage = curPage === undefined || null ? 1 : curPage;
    limit = limit === undefined || null ? 10 : limit;
    this.curPage = curPage;
    this.limit = limit;
  }

  public static change(pageUtil: PageUtil) {
    if (!pageUtil) {
      this.init();
    }
    return new QueryPage(pageUtil.curPage, pageUtil.pageSize);
  }

  public static init() {
   return new QueryPage();
  }
}
