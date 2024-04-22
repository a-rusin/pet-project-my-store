import httpService from "./http.service";

const categoriesEndPoint = "categories/";

const categoriesService = {
  getAll: async () => {
    const { data } = await httpService.get(categoriesEndPoint);
    return data;
  },
};

export default categoriesService;
