import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetSingleViewBonus = (bonus_id) => {
  const { token, tokenLoading } = useContextState();
  const { data: singleBonus = {}, refetch: refetchSingleBonus } = useQuery({
    queryKey: ["singleBonus", bonus_id],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        token: generatedToken,
        type: "viewSingleBonus",
        bonus_id,
      };
      const res = await axios.post(API.bonus, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      if (data?.success) {
        return data?.result?.[0];
      }
    },
    gcTime: 0,
  });
  return { singleBonus, refetchSingleBonus };
};

export default useGetSingleViewBonus;
