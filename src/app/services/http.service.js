import axios from "axios";
import config from "./../config/config.json";

const http = axios.create({
  baseURL: config.apiEndPoint,
});

http.interceptors.response.use(
  async function (response) {
    const randomTime = Math.floor(Math.random() * (2000 - 1000 + 1) + 1000);

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

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
