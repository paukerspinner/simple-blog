import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { IPost } from "../../constants/interface";
import { getPost } from "../../utils/api";
import PostForm from "../post-form";

export default function EditPost() {
  const { id } = useParams();

  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    if (!!id) {
      getPost(parseInt(id)).then((fetchedPost: IPost) => {
        console.log('fetchedPost', fetchedPost)
        setPost(fetchedPost); 
      })
    }
  }, [id]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item sm={8} xs={10}>
        {!!post && <PostForm post={post} />}
      </Grid>
    </Grid>
  )
}