import httpService from "./http.service";
import httpAuthService from "./httpAuth.service";

const ordersEndPoint = "orders/";

const ordersService = {
  add: async (payload) => {
    const { data } = await httpService.post(ordersEndPoint, payload);
    return data;
  },
  getAll: async () => {
    const { data } = await httpAuthService.get(ordersEndPoint);
    return data;
  },
};

export default ordersService;
