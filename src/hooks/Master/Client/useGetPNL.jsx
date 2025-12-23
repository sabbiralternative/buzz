import axios from "axios";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";

const useGetPNL = (args) => {
  const { token, tokenLoading } = useContextState();
  const { data: pnl = [], refetch: refetchPNL } = useQuery({
    queryKey: ["PNL", args],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        ...args,
        token: generatedToken,
        pagination: true,
      };
      const res = await axios.post(API.statement, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      if (data?.success) {
        return data;
      }
    },
  });
  return { pnl, refetchPNL };
};

export default useGetPNL;
