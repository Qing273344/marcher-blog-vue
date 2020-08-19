import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

import store from '@/store/store';

export interface IMainQueryState {
  keyword: string;
}

@Module({dynamic: true, store, name: 'mainQuery'})
export class MainQuery extends VuexModule implements IMainQueryState {
  public keyword = '';

  @Action
  public async QueryKeyword(keyword: string) {
    this.SET_KEYWORD(keyword);
  }

  @Mutation
  protected SET_KEYWORD(keyword: string) {
    this.keyword = keyword;
  }

  get GET_KEYWORD() {
    return this.keyword;
  }
}

export const MainQueryModule: any = getModule(MainQuery);
