import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";

const useGetSingleDeposit = (args) => {
  const { token, tokenLoading } = useContextState();

  const { data: singleDeposit } = useQuery({
    queryKey: ["singleDeposit"],
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
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { singleDeposit };
};

export default useGetSingleDeposit;
