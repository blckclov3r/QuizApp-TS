import { Dispatch, SetStateAction, createContext } from "react";
export interface ContextProps {
  category?: string;
  setCategory?: Dispatch<SetStateAction<string>>;
  difficulty?: string;
  setDifficulty?: Dispatch<SetStateAction<string>>;
  type?: string;
  setType?: Dispatch<SetStateAction<string>>;
  difficulties?: { id: string; name: string }[];
  types?: { id: string; name: string }[];
  amount?: string;
  setAmount?: Dispatch<SetStateAction<string>>;
  score?: number;
  setScore?: Dispatch<SetStateAction<number>>;
  questionIndex?: number;
  setQuestionIndex?: Dispatch<SetStateAction<number>>;
  questions?: any;
  setQuestions?: any;
}
const AppContext = createContext<ContextProps>({});
export default AppContext;
