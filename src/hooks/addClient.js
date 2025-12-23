import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useAddClient = () => {
  return useMutation({
    mutationKey: ["add-client"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.addClient, payload);
      return data;
    },
  });
};
