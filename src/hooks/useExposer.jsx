import { useQuery } from "@tanstack/react-query";
import useContextState from "./useContextState";
import axios from "axios";
import { API } from "../api";
import handleRandomToken from "../utils/handleRandomToken";
import handleEncryptData from "../utils/handleEncryptData";

/* exposure api */
const useExposer = (eventId) => {
  const { token, tokenLoading } = useContextState();
  const { data: exposer = [], refetch: refetchExposure } = useQuery({
    queryKey: ["exposure"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const encryptedData = handleEncryptData({
        token: generatedToken,
      });
      const res = await axios.post(
        `${API.adminExposure}/${eventId}`,
        encryptedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      if (data.success) {
        return data.result;
      }
    },
  });
  return { exposer, refetchExposure };
};

export default useExposer;
