import axios from "axios";
import useContextState from "../../useContextState";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetDownlineEditForm = (payload) => {
  const { token, tokenLoading } = useContextState();
  const { data = {}, refetch } = useQuery({
    queryKey: ["downlone-edit-form"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const postData = {
        ...payload,
        token: generatedToken,
      };
      const res = await axios.post(API.downineEditForm, postData, {
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
  return { data, refetch };
};

export default useGetDownlineEditForm;
