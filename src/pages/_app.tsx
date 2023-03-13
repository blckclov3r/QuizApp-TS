import AppContext from "@/components/AppContext";
import Footer from "@/components/Footer";
import { BASEPATH, difficulties, types } from "@/const";
import "@/styles/globals.css";
import { Container, Link, Typography } from "@mui/material";
import axios from "axios";
import type { AppProps } from "next/app";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const getQuestionPath = ({ amount, category, difficulty, type }: any) => {
  return (
    BASEPATH +
    `/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
  );
};

export interface IQuestions {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface IResponse extends IQuestions {
  response_code: number;
  results: IQuestions[];
}

export default function App({ Component, pageProps }: AppProps) {
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<IResponse>();
  const [questionUrl, setQuestionUrl] = useState<string>("");

  const fetchQuestions = async () => {
    const response = await axios.get(questionUrl);
    return response?.data;
  };

  const { data: response } = useSWR(questionUrl, fetchQuestions);

  const fillAllFieldsMemo = useCallback(() => {
    const fillAllFields = [category, difficulty, type, amount].every(Boolean);
    if (fillAllFields) {
      setQuestionUrl(getQuestionPath({ amount, category, difficulty, type }));
      setQuestions(response);
    }
  }, [category, difficulty, type, amount, response]);
  useEffect(fillAllFieldsMemo, [fillAllFieldsMemo]);

  return (
    <AppContext.Provider
      value={{
        category,
        setCategory,
        difficulty,
        setDifficulty,
        type,
        setType,
        difficulties,
        types,
        amount,
        setAmount,
        questionIndex,
        setQuestionIndex,
        score,
        setScore,
        questions,
        setQuestions,
      }}
    >
      <Container>
        <Typography variant={"body1"}>
          API source from <a href="https://opentdb.com/">https://opentdb.com</a>
        </Typography>
        <Component {...pageProps} />
        <Footer />
      </Container>
    </AppContext.Provider>
  );
}
