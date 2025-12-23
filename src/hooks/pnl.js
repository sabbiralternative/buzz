import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useGetPNL = (payload) => {
  return useQuery({
    queryKey: ["pnl", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.pnl}`, payload);
      return data;
    },
    gcTime: 0,
  });
};
