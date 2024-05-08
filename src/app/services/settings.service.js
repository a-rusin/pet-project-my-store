import httpService from "./http.service";
import httpAuthService from "./httpAuth.service";

const settingsEndPoint = "settings/";

const settingsService = {
  get: async () => {
    const { data } = await httpService.get(settingsEndPoint);
    return data;
  },
  post: async (payload) => {
    const { data } = await httpAuthService.post(settingsEndPoint, payload);
    return data;
  },
};

export default settingsService;
