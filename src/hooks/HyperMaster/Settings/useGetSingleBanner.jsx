import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetSingleBanner = (bannerId) => {
  const { token, tokenLoading } = useContextState();
  const {
    data: singleBanner = [],
    refetch: refetchSingleBanner,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["banner"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        token: generatedToken,
        type: "getSingleBanner",
        bannerId,
      };
      const res = await axios.post(API.banner, payload, {
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
  return { singleBanner, refetchSingleBanner, isLoading, isFetching };
};

export default useGetSingleBanner;
