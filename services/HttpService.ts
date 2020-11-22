import axios from "axios";
import { Vue } from "vue-property-decorator";

Vue.prototype.$http = axios;

export default axios.create({
  headers: {
    "Content-type": "application/json"
  }
});
