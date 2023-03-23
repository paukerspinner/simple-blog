import { Grid } from "@mui/material";
import PostForm from "../post-form";

export default function AddPost() {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item sm={8} xs={10}>
        <PostForm />
      </Grid>
    </Grid>
  )
}