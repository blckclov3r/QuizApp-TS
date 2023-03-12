export const BASEPATH = "https://opentdb.com";

export const getQuestionPath = ({
  amount,
  category,
  difficulty,
  type,
}: any) => {
  return (
    BASEPATH +
    `/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
  );
};
