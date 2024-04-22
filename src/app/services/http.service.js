import axios from "axios";
import config from "./../config/config.json";

axios.defaults.baseURL = config.apiEndPoint;

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default httpService;
