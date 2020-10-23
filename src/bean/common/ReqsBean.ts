/**
 * 请求 bean
 *
 * @author marcher
 */
export class ReqsBean {
  public url: string = '';
  public data: any;

  constructor(url: string, data?: any) {
    this.url = url;
    this.data = data;
  }
}
