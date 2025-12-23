import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../../lib/AxiosSecure";
import { API } from "../../api";
import handleRandomToken from "../../utils/handleRandomToken";

export const useWhiteLabel = (args) => {
  return useQuery({
    queryKey: ["whiteLabel", args],
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        ...args,
        token: generatedToken,
        pagination: true,
      };
      const { data } = await AxiosSecure.post(API.whitelabel, payload);
      if (data?.success) {
        return data;
      }
    },
    gcTime: 0,
  });
};

export const useAddWhiteLabel = () => {
  return useMutation({
    mutationKey: ["addWhiteLabel"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.whitelabel, payload);
      return data;
    },
  });
};
