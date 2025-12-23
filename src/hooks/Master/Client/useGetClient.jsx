import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const useGetClient = (searchId, setFetchClients, fetchClients) => {
  const {
    data: clients = [],
    refetch: refetchClients,
    isSuccess,
    isLoading,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["viewClient"],
    enabled: searchId?.length === 2 && fetchClients,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const payload = {
        searchId,
        token: generatedToken,
        pagination: true,
      };
      const res = await AxiosSecure.post(API.viewClients, payload);
      const data = res.data;

      if (data?.success) {
        setFetchClients(false);
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return {
    clients,
    refetchClients,
    isSuccess,
    isLoading,
    isPending,
    isFetching,
  };
};

export default useGetClient;
