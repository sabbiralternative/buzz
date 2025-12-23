import axios from "axios";
import useContextState from "../../useContextState";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetPaymentMethod = (payload) => {
  const { token, tokenLoading } = useContextState();
  const {
    data: paymentsMethods = [],
    refetch: refetchPaymentMethods,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["paymentsMethod", payload],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const postData = {
        ...payload,
        token: generatedToken,
      };

      const res = await axios.post(API.payments, postData, {
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
  return { paymentsMethods, refetchPaymentMethods, isLoading, isSuccess };
};

export default useGetPaymentMethod;
