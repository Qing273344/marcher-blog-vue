/**
 * 服务的返回的页面数据
 */
export default class PageUtil {
  public pageNo: number = 1;
  public pageSize: number = 10;
  public totalRow: number = 0;
  /**
   * 分页样式
   */
  public pageStyle: number = 1;

  /**
   * 构造器重载
   */
  constructor();
  constructor(pageStyle: number);
  constructor(pageStyle?: number) {
    pageStyle = pageStyle === undefined || null ? 1 : pageStyle;
    this.pageStyle = pageStyle;
  }
}
