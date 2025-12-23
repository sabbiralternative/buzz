import { useQuery } from "@tanstack/react-query";
import useContextState from "./useContextState";
import handleRandomToken from "../utils/handleRandomToken";
import { API } from "../api";
import axios from "axios";

const useGetCurrentRef = (payload) => {
  const { token, tokenLoading } = useContextState();
  const {
    data: currentRef = {},
    refetch: refetchRef,
    isSuccess,
  } = useQuery({
    queryKey: ["currentRef"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const postData = {
        ...payload,
        type: "viewCreditReference",
        token: generatedToken,
      };
      const res = await axios.post(API.downLineEdit, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      if (data.success) {
        return data.result;
      }
    },
    gcTime: 0,
  });
  return { currentRef, refetchRef, isSuccess };
};

export default useGetCurrentRef;
