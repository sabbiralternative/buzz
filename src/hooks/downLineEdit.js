import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";
import handleRandomToken from "../utils/handleRandomToken";

export const useDownLineEdit = (payload) => {
  return useQuery({
    queryKey: ["downLineEdit", payload],
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const postData = {
        ...payload,
        token: generatedToken,
      };
      const { data } = await AxiosSecure.post(`${API.downLineEdit}`, postData);
      return data;
    },
    gcTime: 0,
  });
};
