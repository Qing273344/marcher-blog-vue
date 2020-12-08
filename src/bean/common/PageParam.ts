/**
 * 查询参数(分页)
 *
 * @author marcher
 */
import PageUtil from '@/utils/PageUtil';

export default class pageParam {
  public pageNo: number = 1;
  public pageSize: number = 10;

  constructor();
  constructor(pageNo: number, pageSize: number);
  constructor(pageNo?: number, pageSize?: number) {
    this.pageNo = pageNo === undefined || null ? 1 : pageNo;
    this.pageSize = pageSize === undefined || null ? 10 : pageSize;
  }

  public change(pageUtil: PageUtil) {
    if (!pageUtil) {
      this.init();
    }
    this.pageNo = pageUtil.pageNo;
    this.pageSize = pageUtil.pageSize;
  }

  public init() {
    this.pageNo = 1;
    this.pageSize = 10;
  }
}
