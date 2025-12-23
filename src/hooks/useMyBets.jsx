import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../api";
import useContextState from "./useContextState";
import handleRandomToken from "../utils/handleRandomToken";
import handleEncryptData from "../utils/handleEncryptData";

const useCurrentBets = (eventId) => {
  const { token, tokenLoading } = useContextState();
  const { data: myBets, refetch: refetchCurrentBets } = useQuery({
    queryKey: ["currentBets"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const encryptedData = handleEncryptData({
        type: eventId,
        token: generatedToken,
      });
      const res = await axios.post(`${API.currentBets}`, encryptedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res?.data?.result;

      return data;
    },
    refetchInterval: 7000,
  });
  return { myBets, refetchCurrentBets };
};

export default useCurrentBets;
