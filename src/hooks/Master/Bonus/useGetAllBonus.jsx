import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";

const useGetAllBonus = (args, time) => {
  const { token, tokenLoading } = useContextState();

  const { data: bonus = [], refetch: refetchBonus } = useQuery({
    queryKey: ["bonus", args?.is_claimed],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        ...args,
        token: generatedToken,
      };
      const res = await axios.post(API.bonus, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
    refetchInterval: time ? time : null,
  });
  return { bonus, refetchBonus };
};

export default useGetAllBonus;
