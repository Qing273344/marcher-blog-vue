import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';

import { login, userInfo } from '@/api/login';
import store from '@/store/store';

export interface IUserState {
  token: string;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = '';

  @Action
  public async Login(loginForm: {username: string, password: string} ) {
    return await login(loginForm);
    // return data;
  }

}

export const UserModule = getModule(User);
