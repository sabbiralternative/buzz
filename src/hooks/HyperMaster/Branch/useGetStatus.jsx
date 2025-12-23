import { useQuery } from "@tanstack/react-query";
import { API } from "../../../api";
import useContextState from "../../useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";

const useGetStatus = (payload) => {
  const { token, tokenLoading } = useContextState();
  const { data: status, refetch: refetchStatus } = useQuery({
    queryKey: ["creditRef"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const postData = {
        ...payload,
        token: generatedToken,
      };
      const res = await axios.post(API.downLineEdit, postData, {
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
  return { status, refetchStatus };
};

export default useGetStatus;
