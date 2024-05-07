import httpService from "./http.service";
import httpAuthService from "./httpAuth.service";

const categoriesEndPoint = "categories/";

const categoriesService = {
  getAll: async () => {
    const { data } = await httpService.get(categoriesEndPoint);
    return data;
  },
  post: async (payload) => {
    const { data } = await httpAuthService.post(categoriesEndPoint, payload);
    return data;
  },
  delete: async (categoryId) => {
    const { data } = await httpAuthService.delete(categoriesEndPoint + categoryId);
    return data;
  },
  update: async (categoryId, payload) => {
    const { data } = await httpAuthService.patch(categoriesEndPoint + categoryId, payload);
    return data;
  },
};

export default categoriesService;
