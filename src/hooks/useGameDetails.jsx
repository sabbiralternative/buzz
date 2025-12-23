import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../api";

/* Game details api we are not using in this project */
const useGameDetails = (eventTypeId, eventId) => {
  const { data, refetch: refetchGame } = useQuery({
    queryKey: ["gameDetails"],

    queryFn: async () => {
      const res = await axios.get(`${API.odds}/${eventTypeId}/${eventId}`);
      const data = res.data;
      if (data.success) {
        return data?.result;
      }
    },
    refetchInterval: 600,
    gcTime: 0,
  });
  return { data, refetchGame };
};

export default useGameDetails;
