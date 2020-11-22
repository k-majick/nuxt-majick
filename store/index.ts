import Vue from 'vue';
import Vuex from 'vuex';
import Post from '@/types/Post';

Vue.use(Vuex)

class State {
  posts: Post[] = [];
}

export const store = new Vuex.Store({
  state: new State(),
});
