import { Dispatch, SetStateAction, createContext } from "react";

export interface ContextProps {
  category?: string;
  setCategory?: Dispatch<SetStateAction<string>>;
  difficulty?: string;
  setDifficulty?: Dispatch<SetStateAction<string>>;
  type?: string;
  setType?: Dispatch<SetStateAction<string>>;
  difficulties?: { id: number; name: string }[];
  types?: { id: number; name: string }[];
}
const AppContext = createContext<ContextProps>({});
export default AppContext;
