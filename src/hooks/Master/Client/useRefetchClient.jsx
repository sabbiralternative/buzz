import axios from "axios";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";

const useRefetchClient = (searchId) => {
  const { token, tokenLoading, setClientData } = useContextState();

  const { data: clients = [], refetch: refetchClient } = useQuery({
    queryKey: ["refetchClients"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        searchId,
        token: generatedToken,
      };
      const res = await axios.post(API.viewClients, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      if (data?.success) {
        setClientData(data?.result);
        return data?.result;
      }
    },
  });
  return { clients, refetchClient };
};

export default useRefetchClient;
