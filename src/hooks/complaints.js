import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useComplaints = (payload) => {
  return useQuery({
    queryKey: ["complaints", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.complaint, payload);
      return data;
    },
    gcTime: 0,
  });
};

export default useComplaints;
