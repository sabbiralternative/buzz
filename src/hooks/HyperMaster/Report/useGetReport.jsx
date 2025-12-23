import axios from "axios";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";

const useGetReport = (args, downloadData) => {
  const { token, tokenLoading } = useContextState();
  const { data: reports = [], refetch: refetchReports } = useQuery({
    queryKey: ["exports"],
    enabled: !tokenLoading && downloadData,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        ...args,
        token: generatedToken,
      };
      const res = await axios.post(API.export, payload, {
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
  return { reports, refetchReports };
};

export default useGetReport;
