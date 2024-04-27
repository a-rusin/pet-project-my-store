import httpService from "./http.service";
import httpAuthService from "./httpAuth.service";

const authEndPoint = "auth/";

const authService = {
  register: async (userData) => {
    const { data } = await httpService.post(authEndPoint + "register", userData);
    return data;
  },
  login: async (userData) => {
    const { data } = await httpService.post(authEndPoint + "login", userData);
    return data;
  },
  getUser: async (userId) => {
    const { data } = await httpAuthService.post(authEndPoint + "getUser", { userId });
    return data;
  },
};

export default authService;