import httpService from "./http.service";

const productsEndPoint = "products/";

const productsService = {
  getAll: async (path) => {
    const { data } = await httpService.get(productsEndPoint + (path || ""));
    return data;
  },
  getProductsByArray: async (productsArray) => {
    const { data } = await httpService.post(productsEndPoint + "/basket", { products: productsArray });
    return data;
  },
};

export default productsService;
