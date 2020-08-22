/**
 * query
 *
 * @author marcher
 */
import pageParam from '@/utils/pageParam';

export default class Query<T> {
  public data: T;

  public page: pageParam;

  constructor(data: T, page: pageParam) {
    this.data = data;
    this.page = page;
  }
}
