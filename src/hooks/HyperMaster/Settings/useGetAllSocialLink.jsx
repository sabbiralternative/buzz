import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetAllSocialLink = () => {
  const { token, tokenLoading } = useContextState();
  const {
    data: socialLinks = [],
    refetch: refetchAllSocialLinks,
    isLoading,
  } = useQuery({
    queryKey: ["socialLink"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        token: generatedToken,
        type: "getSocial",
      };
      const res = await axios.post(API.socialLinks, payload, {
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
  return { socialLinks, refetchAllSocialLinks, isLoading };
};

export default useGetAllSocialLink;
