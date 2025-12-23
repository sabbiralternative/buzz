import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";
import handleRandomToken from "../utils/handleRandomToken";

export const useGetActivityLogs = (payload) => {
  return useQuery({
    queryKey: ["activityLogs", payload],
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const postData = {
        ...payload,
        token: generatedToken,
        pagination: true,
      };
      const { data } = await AxiosSecure.post(API.activityLogs, postData);
      return data;
    },
  });
};
