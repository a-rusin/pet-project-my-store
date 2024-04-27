import axios from "axios";
import config from "./../config/config.json";
import localStorageService from "./localStorage.service";
import localStorageConstants from "../../constants/localStorage.constants";

const httpAuth = axios.create({
  baseURL: config.apiEndPoint,
  headers: {
    Authorization: `Bearer ${localStorageService.get(localStorageConstants.token)}`,
  },
});

httpAuth.interceptors.response.use(
  async function (response) {
    const randomTime = Math.floor(Math.random() * (3000 - 1500 + 1) + 1500);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, randomTime);
    });
  },
  function (error) {
    return Promise.reject(error);
  }
);

const httpAuthService = {
  get: httpAuth.get,
  post: httpAuth.post,
  delete: httpAuth.delete,
  patch: httpAuth.patch,
  put: httpAuth.put,
};

export default httpAuthService;
