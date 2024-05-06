import httpAuthService from "./httpAuth.service";
import httpService from "./http.service";

const feedbackEndPoint = "feedback/";

const feedbackService = {
  post: async (payload) => {
    const { data } = await httpService.post(feedbackEndPoint, payload);
    return data;
  },
  getAll: async () => {
    const { data } = await httpAuthService.get(feedbackEndPoint);
    return data;
  },
};

export default feedbackService;
