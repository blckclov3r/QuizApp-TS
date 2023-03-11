import AppContext from "@/components/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [type, setType] = useState<string>("");
  const difficulties = [
    {
      id: 1,
      name: "Easy",
    },
    {
      id: 2,
      name: "Medium",
    },
    {
      id: 3,
      name: "Hard",
    },
  ];

  const types = [
    {
      id: 1,
      name: "Multiple",
    },
    {
      id: 2,
      name: "True /False",
    },
  ];
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
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
