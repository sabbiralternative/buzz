import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";

const useGetALLDeposit = (args, time) => {
  const { token, tokenLoading } = useContextState();

  const {
    data: allUTRs = [],
    refetch: refetchAllUTRs,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["pendingUTR", args],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        ...args,
        token: generatedToken,
      };
      const res = await axios.post(API.utr, payload, {
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
  return { allUTRs, refetchAllUTRs, isLoading, isSuccess };
};

export default useGetALLDeposit;
