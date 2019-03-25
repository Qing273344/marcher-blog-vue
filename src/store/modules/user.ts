import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';

import LoginApi from '@/api/login';
import store from '@/store/store';
import { UserInfoBean } from '@/bean/UserInfoBean';

export interface IUserState {
  username: string;
  userType: number;
  isLogin: boolean;
}

@Module({dynamic: true, store, name: 'user'})
export class User extends VuexModule implements IUserState {
  public username = '';
  public userType = 0;
  public isLogin = false;

  @Action
  public async Login(loginForm: { username: string, password: string }) {
    return await LoginApi.login(loginForm);
  }

  @Action
  public async UserInfo(userInfoBean: UserInfoBean) {
    this.SET_USER_INFO(userInfoBean);
  }

  @Mutation
  private SET_USER_INFO(userInfoBean: UserInfoBean) {
    this.userType = userInfoBean.userType;
    this.username = userInfoBean.username;
    this.isLogin = true;
  }

}

export const UserModule = getModule(User);
