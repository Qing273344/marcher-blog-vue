/**
 * query
 *
 * @author marcher
 */
import QueryPage from '@/utils/queryPage';

export default class Query<T> {
  public data: T;

  public page: QueryPage;

  constructor(data: T, page: QueryPage) {
    this.data = data;
    this.page = page;
  }
}
