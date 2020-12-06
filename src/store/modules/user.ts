import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

import store from '@/store/store';
import { UserInfoBean } from '@/bean/UserInfoBean';
import LocalStorageUtil from '@/utils/localStorageUtil';
import AdminPassportApi from '@/api/AdminPassportApi';

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
    return AdminPassportApi.login(loginForm);
  }

  @Action
  public async UserInfo(userInfoBean: UserInfoBean) {
    userInfoBean.isLogin = true;
    this.SET_USER_INFO(userInfoBean);

    LocalStorageUtil.setItem(LocalStorageUtil.USER_INFO, JSON.stringify(userInfoBean));
  }

  @Action
  public async LoadUserInfo() {
    let userInfo: UserInfoBean = new UserInfoBean();
    const userInfoStr: any = LocalStorageUtil.getItem(LocalStorageUtil.USER_INFO);
    if (userInfoStr) {
      userInfo = JSON.parse(userInfoStr);
    } else {
      this.INIT_USER_INFO();
    }
    this.SET_USER_INFO(userInfo);
  }

  @Action
  public async setPassport(token: string) {
    LocalStorageUtil.setItem(LocalStorageUtil.USER_BEARER, token);
  }

  @Action
  public async getPassport() {
    return LocalStorageUtil.getItem(LocalStorageUtil.USER_BEARER);
  }

  @Mutation
  public async INIT_USER_INFO() {
    this.userType = 0;
    this.isLogin = false;
    LocalStorageUtil.removeItem(LocalStorageUtil.USER_INFO);
    LocalStorageUtil.removeItem(LocalStorageUtil.USER_BEARER);
  }

  @Mutation
  private SET_USER_INFO(userInfoBean: UserInfoBean) {
    this.username = userInfoBean.username;
    this.userType = userInfoBean.userType;
    this.isLogin = userInfoBean.isLogin;
  }


}

export const UserModule = getModule(User);
