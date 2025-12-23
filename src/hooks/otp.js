import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosEncrypt } from "../lib/AxiosEncrypt";

export const useOTP = () => {
  return useMutation({
    mutationKey: ["otp"],
    mutationFn: async (payload) => {
      const { data } = await AxiosEncrypt.post(API.otp, payload);
      return data;
    },
  });
};
