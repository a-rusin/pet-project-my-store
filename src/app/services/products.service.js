import httpService from "./http.service";
import httpAuthService from "./httpAuth.service";

const productsEndPoint = "products/";

const productsService = {
  getAll: async (path) => {
    const { data } = await httpService.get(productsEndPoint + (path || ""));
    return data;
  },
  getProductsByArray: async (productsArray) => {
    const { data } = await httpService.post(productsEndPoint + "getByArray", {
      products: productsArray,
    });
    return data;
  },
  getProductById: async (productId) => {
    const { data } = await httpService.get(productsEndPoint + "item/" + productId);
    return data;
  },
  getProductsBySearch: async (searchText) => {
    const { data } = await httpService.post(productsEndPoint + "search", {
      searchText,
    });
    return data;
  },
  updateProduct: async (productId, payload) => {
    const { data } = await httpAuthService.patch(productsEndPoint + productId, payload);
    return data;
  },
  deleteProduct: async (productId) => {
    const { data } = await httpAuthService.delete(productsEndPoint + productId);
    return data;
  },
  addNewProduct: async (payload) => {
    const { data } = await httpAuthService.post(productsEndPoint, payload);
    return data;
  },
};

export default productsService;
