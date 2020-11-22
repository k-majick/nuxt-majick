import http from "./HttpService";
import { PATHSSERVICES } from '../app.settings';

class PostsService {

  getPost(apiBase: string, slug: string) {
    return http.get(apiBase + PATHSSERVICES.posts.path + `?slug=${slug}&_embed`);
  }

  getPosts(apiBase: string, page = 1) {
    return http.get(apiBase + PATHSSERVICES.posts.path + `?per_page=100&page=${page}&_embed&category=1`);
  }

  getPostThumbnail(apiBase: string, id: number) {
    return http.get(apiBase + PATHSSERVICES.media.path + `/` + id);
  }

  getPage(apiBase: string, slug: string) {
    return http.get(apiBase + PATHSSERVICES.pages.path + `?slug=${slug}&_embed`)
  }

}

export default new PostsService();
