import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetViewAllBanner = () => {
  const { token, tokenLoading } = useContextState();
  const { data: banners = [], refetch: refetchAllBanners } = useQuery({
    queryKey: ["banner"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        token: generatedToken,
        type: "getBanners",
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
  return { banners, refetchAllBanners };
};

export default useGetViewAllBanner;
