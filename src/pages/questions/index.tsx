import AppContext from "@/components/AppContext";
import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { parseEntities } from "parse-entities";
import { useRouter } from "next/router";

const Home = () => {
  const { questionIndex, setQuestionIndex, score, setScore, questions } =
    useContext(AppContext);
  const router = useRouter();

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  let options = questions?.results[
    questionIndex ?? 0
  ]?.incorrect_answers?.filter(
    (item: any, pos: any, self: any) => self.indexOf(item) === pos
  );
  options?.splice(
    getRandomInt(options.length),
    0,
    questions?.results[questionIndex ?? 0]?.correct_answer
  );

  const handleClickAnswer = (e: any) => {
    e.preventDefault();
    // alert(e.target.textContent);
    const question = questions?.results[questionIndex ?? 0];
    if (question?.correct_answer === e.target.textContent) {
      setScore?.((prev) => prev + 1);
    }
    if ((questionIndex as number) + 1 < questions?.results.length) {
      setQuestionIndex?.((prevState) => (prevState += 1));
    } else {
      router.push("/score");
    }
  };

  return (
    <>
      <Typography variant="h1">Question {(questionIndex ?? 0) + 1}</Typography>
      <Typography variant="h5">
        Response Code:{" "}
        <Box
          sx={{
            color: questions?.response_code === 0 ? "blue" : "red",
            display: "inline-block",
          }}
        >
          {questions?.response_code}
        </Box>
      </Typography>
      <Typography variant="body1">
        {parseEntities(questions?.results[questionIndex ?? 0]?.question ?? "")}
      </Typography>
      {options?.map((answer: string, index: number) => (
        <Box mt={3} key={answer}>
          <Button
            variant="contained"
            onClick={handleClickAnswer}
          >{`${parseEntities(answer)}`}</Button>
        </Box>
      ))}
      {questions?.results?.length > 0 ? (
        <Box mt={5}>
          Score: {score} / {questions?.results?.length}
        </Box>
      ) : null}
    </>
  );
};

export default Home;
