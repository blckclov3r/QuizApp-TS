import AppContext from "@/components/AppContext";
import { getQuestionPath } from "@/const";
import "@/styles/globals.css";
import { Container } from "@mui/material";
import axios from "axios";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function App({ Component, pageProps }: AppProps) {
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<any | null>();

  console.log("@@questions", questions);
  const difficulties = [
    {
      id: "easy",
      name: "Easy",
    },
    {
      id: "medium",
      name: "Medium",
    },
    {
      id: "hard",
      name: "Hard",
    },
  ];

  const types = [
    {
      id: "multiple",
      name: "Multiple",
    },
    {
      id: "boolean",
      name: "True /False",
    },
  ];

  const questionUrl = getQuestionPath({ amount, category, difficulty, type });

  const fetchQuestions = async () => {
    const response = await axios.get(questionUrl);
    return response?.data;
  };

  const { data: response } = useSWR(questionUrl, fetchQuestions);

  useEffect(() => {
    const fillAllFields = [category, difficulty, type, amount].every(Boolean);
    console.log("@@FILLALLFIELDS", fillAllFields);
    if (fillAllFields && !questions) {
      setQuestions(response);
    }
  }, [category, difficulty, type, amount, response]);

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
        <Component {...pageProps} />
      </Container>
    </AppContext.Provider>
  );
}
