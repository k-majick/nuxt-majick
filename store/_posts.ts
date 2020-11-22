import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import PostsService from '@/services/PostsService';
import Post from '@/types/Post';
import { store } from "@/store";

@Module({
  dynamic: true,
  name: 'postsModule',
  namespaced: true,
  stateFactory: true,
  store
})
export default class PostsModule extends VuexModule {
  posts: Post[] = [];

  @Action({ rawError: true })
  async loadPosts(baseApi: string) {
    return PostsService.getPosts(baseApi)
      .then(res => {
        const posts = res.data;
        this.context.commit('updatePosts', posts);

        return new Promise((res) => {
          res(posts);
        })
      })
  }

  @Mutation
  updatePosts(posts: Post[]) {
    this.posts = posts;
  }

  get allPosts(): Post {
    return this.posts;
  }

  get filterPosts(): Post {
    return (catId: number) => {
      return this.posts.filter((post: Post) => post.categories[0] === catId);
    }
  }

}
