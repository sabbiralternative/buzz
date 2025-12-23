import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import axios from "axios";

const useUTR = () => {
  return useMutation({
    mutationKey: ["utr"],
    mutationFn: async (filePath) => {
      const { data } = await axios.post(`${API.detectUtr}`, { filePath });
      return data;
    },
    gcTime: 0,
  });
};

export default useUTR;
