import AppContext, { ContextProps } from "@/components/AppContext";
import styles from "@/styles/Home.module.css";
import {
  Typography,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { FormEvent, useContext } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const response = await axios(`https://opentdb.com/api_category.php`);
  const categories = await response.data;
  return {
    props: {
      categories: categories?.trivia_categories,
    },
  };
}

export default function Home(props: any) {
  const {
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
    questions,
  } = useContext<ContextProps>(AppContext);
  const router = useRouter();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const fillAllFields = [category, difficulty, type, amount].every(Boolean);
    if (fillAllFields && questions?.results.length > 0) {
      router.push(`/questions`);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Typography variant={"h1"}>Quiz App</Typography>
        <form onSubmit={submitHandler}>
          <Grid container>
            <Grid item xs={8} sx={{ mt: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Categories
                </InputLabel>
                <Select
                  labelId="categories-label-id"
                  id="categories-id"
                  value={category}
                  label="Categories"
                  onChange={(e) => {
                    setCategory?.(e.target.value);
                  }}
                >
                  {props?.categories?.map((item: any) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sx={{ mt: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Difficulty
                </InputLabel>
                <Select
                  labelId="difficulty-label-id"
                  id="difficulty-id"
                  value={difficulty}
                  label="Difficulties"
                  onChange={(e) => {
                    setDifficulty?.(e.target.value);
                  }}
                >
                  {difficulties?.map((item: any) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sx={{ mt: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="type-label-id"
                  id="type-id"
                  value={type}
                  label="Type"
                  onChange={(e) => {
                    setType?.(e.target.value);
                  }}
                >
                  {types?.map((item: any) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sx={{ mt: 4 }}>
              <TextField
                type="number"
                id="outlined-basic"
                fullWidth
                label="Amount of Questions"
                variant="outlined"
                value={amount}
                onChange={(e) => {
                  setAmount?.(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          {/* <Link href="/questions" passHref legacyBehavior>
            <Button variant="contained" sx={{ mt: 4 }}>
                Get Started...
              </Button>
          </Link> */}
          <Button type={"submit"} variant="contained" sx={{ mt: 4 }}>
            Get Started...
          </Button>
        </form>
      </main>
    </>
  );
}
