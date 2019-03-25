/**
 * 查询参数(分页)
 *
 * @author marcher
 */
export default class QueryPage {
  public curPage: number = 1;
  public limit: number = 10;

   constructor(curPage: number, limit: number) {
    this.curPage = curPage;
    this.limit = limit;
   }

   public static init() {
     return new QueryPage(1, 10);
   }
}
