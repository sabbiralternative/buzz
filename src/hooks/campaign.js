import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useCampaign = () => {
  return useMutation({
    mutationKey: ["campaign"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.campaign, payload);
      return data;
    },
  });
};

export const useGetCampaigns = (payload) => {
  return useQuery({
    queryKey: ["view-campaign", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.campaign, payload);
      return data;
    },
  });
};
