import Vue from 'vue';
import Vuex from 'vuex';
import { IUserState } from '@/store/modules/user';
import { IMainQueryState } from '@/store/modules/mainQuery';

Vue.use(Vuex);

export interface IRootState {
  user: IUserState;
  mainQuery: IMainQueryState;
}

export default new Vuex.Store<IRootState>({
});
