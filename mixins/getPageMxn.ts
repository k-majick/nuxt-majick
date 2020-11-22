import { Vue, Component } from 'nuxt-property-decorator';
import Post from '../types/Post';
import {
  NAME
} from '@/app.settings';

declare module 'vue/types/vue' {
  interface Vue {
    _data: any;
    page: Post;
    asyncData({
      store,
      route,
      $context
    }: {
        store: any,
        route: any,
        $context: any
      }): any;
  }
}

@Component
export default class GetPageMxn extends Vue {
  public page: Post = [];

  asyncData({
    $config: { baseApi },
    store,
    route
  }: {
      store: any,
      route: any
    }) {
    return store.dispatch('_page/loadPage', { routePath: route.path, baseApi: baseApi })
      .then((res: Post) => {
        res
        return {
          page: res[0],
          description: res[0].content.rendered,
          title: res[0].title.rendered
        }
      });
  }

  head() {
    return {
      title: `${NAME} | ${this._data.title}`,
      meta: [
        {
          property: 'og:title',
          content: `${NAME} | ${this._data.title}`
        }, {
          property: 'og:description',
          content: `${this.stripTags(this._data.description)}`
        },
        {
          name: 'description',
          content: `${this.stripTags(this._data.description)}`
        }
      ]
    }
  }

  stripTags(txt: string) {
    let res = txt.replace(/(<([^>]+)>)/gi, "");
    return res;
  }

}
