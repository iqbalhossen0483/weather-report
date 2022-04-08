import { createContext, FC, ReactNode } from "react";
import { StoreSchema } from "./Store";

interface Props {
  store: StoreSchema;
  children: ReactNode;
}

export const Contex = createContext<StoreSchema | null>(null);

const Provider: FC<Props> = ({ store, children }) => {
  return <Contex.Provider value={store}>{children}</Contex.Provider>;
};

export default Provider;
