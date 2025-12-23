import { useContext } from "react";
import { StateContext } from "../context/StateProvider";
/* state provider short cut hook */
const useContextState = () => {
  const state = useContext(StateContext);
  return state;
};

export default useContextState;
