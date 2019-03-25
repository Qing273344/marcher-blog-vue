/**
 * 服务端响应的数据结构
 *
 * @author marcher
 */
export class ResponseBean {
  public data!: object;
  public status = {
    code: 0,
    msg: 'success',
  };
  public page = {
    totalRow: null,
    totalPage: null,
    pageSize: null,
    curPage: null,
    firstPage: true,
    lastPage: true,
  };
}
