import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";

const useGetSingleWithdraw = (args) => {
  const { token, tokenLoading } = useContextState();

  const { data: singleWithdraw = [], refetch: refetchSingleWithdraw } =
    useQuery({
      queryKey: ["singleWithdraw"],
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
          return data?.result;
        }
      },
      gcTime: 0,
    });
  return { singleWithdraw, refetchSingleWithdraw };
};

export default useGetSingleWithdraw;
