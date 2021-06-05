import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_RESET, LOADING, url } from "./contants";
import { post,put } from "@/services/api.services.js";
import { saveToken, removeToken } from "@/storage/token.storage.js";
import { saveUser, removeUser } from "@/storage/user.storage.js";
import router from "@/router";
export default {
  async loginAction({ commit }, { username, password, remember = true }) {
    commit(LOGIN_REQUEST);
    const response = await post(
      url,
      { username, password, remember },
      "disabledEvents"
    );
    if (response.success) {
      saveToken(response.data.data.token, remember);
      saveUser(response.data.data.user, remember);
      commit(LOGIN_SUCCESS, response.data.data);
      router.push(router.history.current.query.redirect || "/");
      return null;
    } else {
      commit(LOGIN_RESET);
      return response.data?.data?.message || response.message;
    }
  },
  updateUserPassword: async ({ commit }, form) => {
    commit(LOADING, true);
    const response = await put('/userfake', form, 'disabledEvents');
    commit(LOADING, false);
    if (response.success) {
      return null;
    } else {
      return response.data?.data?.message || response.message;
    }
  },
  async createUser({ commit }, form) {
    commit(LOADING, true);
    const response = await post('/userfake', form);
    commit(LOADING, false);
    if (response.success) {
      return null;
    } else {
      return response.data?.data?.message || response.message;
    }
  },
  logout({ commit }) {
    commit(LOGIN_RESET);
    removeToken();
    removeUser();
    router.push("/login");
    location.reload();
  },
};
