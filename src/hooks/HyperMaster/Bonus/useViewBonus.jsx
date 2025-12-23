import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetViewBonus = () => {
  const { token, tokenLoading } = useContextState();
  const { data: bonus = [], refetch: refetchBonus } = useQuery({
    queryKey: ["bonus"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = { token: generatedToken, type: "viewBonus" };
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
  });
  return { bonus, refetchBonus };
};

export default useGetViewBonus;
