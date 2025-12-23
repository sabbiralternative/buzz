import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import axios from "axios";
import { API } from "../../../api";

const useGetMarketAnalysis = (payload) => {
  const { token, tokenLoading } = useContextState();
  const { data: marketAnalysis = [], refetch: refetchMarketAnalysis } =
    useQuery({
      queryKey: ["market-analysis", payload],
      enabled: !tokenLoading,
      queryFn: async () => {
        const res = await axios.post(API.marketAnalysis, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        if (data?.success) {
          return data?.result;
        }
      },
      refetchInterval: 1000 * 15,
    });
  return { marketAnalysis, refetchMarketAnalysis };
};

export default useGetMarketAnalysis;
