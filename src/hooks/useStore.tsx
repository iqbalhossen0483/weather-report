import { useContext } from "react";
import { Contex } from "../contexAPI/Provider";

const useStore = () => {
  return useContext(Contex);
};

export default useStore;
