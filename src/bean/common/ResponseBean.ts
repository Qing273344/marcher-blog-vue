/**
 * 服务端响应的数据结构
 *
 * @author marcher
 */
import PageUtil from '@/utils/pageUtil';

export class ResponseBean {
  public data: any;
  public code: any;
  public message: any;

  public page = new PageUtil();

}
