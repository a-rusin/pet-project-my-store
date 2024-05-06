import httpService from "./http.service";

const sliderEndPoint = "slider/";

const sliderService = {
  post: async (payload) => {
    const { data } = await httpService.post(
      sliderEndPoint + "upload",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  },
  getAll: async () => {
    const { data } = await httpService.get(sliderEndPoint);
    return data;
  },
};

export default sliderService;
