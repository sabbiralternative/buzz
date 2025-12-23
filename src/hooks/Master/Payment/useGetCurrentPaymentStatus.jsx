import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";

const useGetCurrentPaymentStatus = (paymentId) => {
  const { token, tokenLoading } = useContextState();
  const { data: currentPaymentStatus } = useQuery({
    queryKey: ["currentPaymentStatus"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        paymentId: paymentId,
        type: "ViewPaymentStatus",
        token: generatedToken,
      };
      const res = await axios.post(API.payments, payload, {
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
  return { currentPaymentStatus };
};

export default useGetCurrentPaymentStatus;
