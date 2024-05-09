import httpService from "./http.service";
import httpAuthService from "./httpAuth.service";

const newsEndPoint = "news/";

const newsService = {
  getAll: async () => {
    const { data } = await httpService.get(newsEndPoint);
    return data;
  },
  post: async (payload) => {
    const { data } = await httpAuthService.post(newsEndPoint, payload);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await httpAuthService.patch(newsEndPoint + id, payload);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpAuthService.delete(newsEndPoint + id);
    return data;
  },
};

export default newsService;
