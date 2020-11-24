import http from "./HttpService";

class NavService {

  getNav(apiBase: string, menuId: string) {
    return http.get(apiBase + 'wp-api-menus/v2/menus/' + menuId)
  }

}

export default new NavService();
