import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetSiteNotification = () => {
  const { token, tokenLoading } = useContextState();
  const {
    data: siteNotification = [],
    refetch: refetchSiteNotification,
    isLoading,
  } = useQuery({
    queryKey: ["siteNotify"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        token: generatedToken,
        type: "getNotification",
      };
      const res = await axios.post(API.notification, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      if (data?.success) {
        return data?.result?.message;
      }
    },
    gcTime: 0,
  });
  return { siteNotification, refetchSiteNotification, isLoading };
};

export default useGetSiteNotification;
