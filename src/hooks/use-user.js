import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import useContextState from "./useContextState";

export const useUser = () => {
  const { token } = useContextState();

  const user = useMemo(() => {
    if (!token) return [];

    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (err) {
      console.error("Invalid JWT:", err);
      return [];
    }
  }, [token]);

  return { user };
};
