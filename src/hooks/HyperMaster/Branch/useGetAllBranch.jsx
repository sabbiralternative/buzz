import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { AdminRole } from "../../../constant/constant";

const useGetAllBranch = (postData) => {
  const { token, tokenLoading, adminRole } = useContextState();
  const { data: branches = [], refetch: refetchAllBranch } = useQuery({
    queryKey: ["branch", postData],
    enabled:
      !tokenLoading &&
      (adminRole === AdminRole.hyper_master ||
        adminRole === AdminRole.admin_staff),
    queryFn: async () => {
      const generatedToken = handleRandomToken();

      const payload = { token: generatedToken, ...postData };

      const res = await axios.post(API.viewBranches, payload, {
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
  return { branches, refetchAllBranch };
};

export default useGetAllBranch;
