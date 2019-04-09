/**
 * 服务端响应的数据结构
 *
 * @author marcher
 */
import PageUtil from '@/utils/pageUtil';

export class ResponseBean {
  public data: any;
  public status = {
    code: 0,
    msg: 'success',
  };
  public page = new PageUtil();

  // public page = {
  //   totalRow: null,
  //   totalPage: null,
  //   pageSize: null,
  //   curPage: null,
  //   firstPage: true,
  //   lastPage: true,
  // };
}
