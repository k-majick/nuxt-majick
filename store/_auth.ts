import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { store } from "@/store";
import Post from '@/types/Post';
// import axios from "axios";

@Module({
  dynamic: true,
  name: 'authModule',
  namespaced: true,
  stateFactory: true,
  store
})
export default class AuthModule extends VuexModule {
  user = {};
  token = {};

  // @Action({ rawError: true })
  // async registerUser() {
  //     try {
  //         const user = await axios.get('http://localhost:7777/register');
  //         this.context.commit('setUser', user);
  //     } catch (error) {
  //         this.context.commit('setUser', {});
  //     }
  // }

  @Action({ rawError: true })
  loginUser(payload: Post) {
    this.context.commit("setUser", payload);
  }

  @Action({ rawError: true })
  logoutUser() {
    let user = null;
    let token = null;
    this.context.commit("resetUser", { user, token });
  }

  @Mutation
  setUser(data: Post) {
    this.user = data.userData;
    this.token = data.token;
  }

  @Mutation
  resetUser({ user, token } : { user: Object, token: Object }) {
    this.user = user;
    this.token = token;
  }

  // get isAuthenticated() {
  //   return !!this.user;
  // }
  //
  // get stateUser() {
  //   return this.user
  // }

}
