import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";

export const useAddChecker = () => {
  return useMutation({
    mutationKey: ["add-checker"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.staff, payload);
      return data;
    },
  });
};

export const useGetAllChecker = () => {
  return useQuery({
    queryKey: ["view-checker"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.staff, {
        type: "viewStaff",
        role: "admin_staff",
      });
      return data;
    },
  });
};

export const useGetSingleChecker = (payload) => {
  return useQuery({
    queryKey: ["single-checker", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.staff, payload);
      return data;
    },
    gcTime: 0,
  });
};
export const useUpdateSingleChecker = () => {
  return useMutation({
    mutationKey: ["update-single-checker"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.staff, payload);
      return data;
    },
  });
};
