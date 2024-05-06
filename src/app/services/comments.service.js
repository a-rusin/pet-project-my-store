import httpService from "./http.service";
import httpAuthService from "./httpAuth.service";

const commentsEndPoint = "comments/";

const commentsService = {
  add: async (payload) => {
    const { data } = await httpAuthService.post(commentsEndPoint, payload);
    return data;
  },
  get: async (productId) => {
    const { data } = await httpService.get(commentsEndPoint + productId);
    return data;
  },
};

export default commentsService;
