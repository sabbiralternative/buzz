import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";

const useGetALLWithdraw = (args, time) => {
  const { token, tokenLoading } = useContextState();
  const {
    data: allWithdraw = [],
    refetch: refetchAllWithdraw,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["withdrawPAR", args],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        ...args,
        token: generatedToken,
      };
      const res = await axios.post(API.withdraw, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      if (data?.success) {
        return data;
      }
    },
    gcTime: 0,
    refetchInterval: time ? time : null,
  });
  return { allWithdraw, refetchAllWithdraw, isLoading, isSuccess };
};

export default useGetALLWithdraw;
