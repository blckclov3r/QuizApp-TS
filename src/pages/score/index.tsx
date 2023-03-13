import AppContext from "@/components/AppContext";
import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const Score = () => {
  const {
    score,
    setScore,
    setAmount,
    setCategory,
    setDifficulty,
    setQuestionIndex,
    setQuestions,
    questions,
  } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!questions) {
      router.push("/");
    }
  }, [questions, router]);

  return (
    <>
      <Typography variant="h1">
        Score:{" "}
        <Box sx={{ color: "blue", display: "inline-block" }}>{score}</Box>
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          type={"button"}
          variant="contained"
          onClick={() => {
            router.push("/");
            setScore?.(0);
            setAmount?.("");
            setCategory?.("");
            setDifficulty?.("");
            setQuestionIndex?.(0);
            setQuestions?.({});
          }}
        >
          Homepage
        </Button>
      </Box>
    </>
  );
};

export default Score;
