import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Container,
  Typography,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios(`https://opentdb.com/api_category.php`);
  const data = await res.data;

  // Pass data to the page via props
  return { props: { ...data } };
}

export default function Home(props: any) {
  const [categories, setCategories] = useState<string>();
  const [difficulty, setDifficulty] = useState<string>();
  const [type, setType] = useState<string>();

  console.log("@@", categories);
  console.log("@@props", props?.trivia_categories);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Container>
          <Typography variant={"h1"}>Quiz App</Typography>
          <Grid container>
            <Grid item xs={6} sx={{ mt: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Categories
                </InputLabel>
                <Select
                  labelId="categories-label-id"
                  id="categories-id"
                  value={categories}
                  label="Categories"
                  onChange={(e) => {
                    setCategories(e.target.value);
                  }}
                >
                  {props?.trivia_categories?.map((item: any) => (
                    <MenuItem value={item?.id} key={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}
