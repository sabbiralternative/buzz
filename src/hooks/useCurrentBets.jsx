import { useQuery } from "@tanstack/react-query";
import useContextState from "./useContextState";
import handleRandomToken from "../utils/handleRandomToken";
import handleEncryptData from "../utils/handleEncryptData";
import { API } from "../api";
import axios from "axios";

const useCurrentBets = (payload) => {
  const { token, tokenLoading } = useContextState();
  const { data: currentBets } = useQuery({
    queryKey: ["currentBets", payload],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const encryptedData = handleEncryptData({
        ...payload,
        type: "sports",
        token: generatedToken,
      });
      const res = await axios.post(API.currentBets, encryptedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;

      if (data?.success) {
        return data;
      }
    },
    refetchInterval: 1000 * 15,
  });
  return { currentBets };
};

export default useCurrentBets;
