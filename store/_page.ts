import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import PostsService from '@/services/PostsService';
import Post from '@/types/Post';
import { store } from "@/store";

@Module({
  dynamic: true,
  name: 'pageModule',
  namespaced: true,
  stateFactory: true,
  store
})
export default class PageModule extends VuexModule {
  page: Post = [];

  @Action({ rawError: true })
  async loadPage(payload: Post) {
    return PostsService.getPage(payload.baseApi, payload.routePath)
      .then(res => {
        const page = res.data;
        this.context.commit('updatePage', page);

        return new Promise((res) => {
          res(page);
        })
      })
  }

  @Mutation
  updatePage(page: Post) {
    this.page = page;
  }

  get getPage(): Post {
    return this.page;
  }
}
