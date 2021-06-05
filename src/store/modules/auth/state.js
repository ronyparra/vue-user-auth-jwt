
import {getToken} from "@/storage/token.storage.js";
import {getUser} from "@/storage/user.storage.js";
export default {
  isLogin: getToken() ? true  : false,
  user: getUser(),
  token: getToken(),
  loading: false
}
