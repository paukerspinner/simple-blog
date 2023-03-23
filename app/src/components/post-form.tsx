import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IPost, IPostInputs } from "../constants/interface";
import { createPost, updatePost } from "../utils/api";
import { SHOW_POST_PATH } from "../utils/routes";


interface PostFormProps {
  post?: IPost
}

export default function PostForm({ post }: PostFormProps) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IPostInputs>({});

  useEffect(() => {
    if (!!post) {
      setValue('title', post.title);
      setValue('content', post.content);
      setValue('createdBy', post.createdBy);
    }
  }, []);

  const onSubmit = async (postInputs: IPostInputs) => {
    console.log('postInputs', postInputs);
    if (!!post) {
      updatePost(post.id, postInputs).then(res => {
        navigate(SHOW_POST_PATH.replace(':id', `${post.id}`));
      });
    } else {
      createPost(postInputs).then((createdPost: IPost) => {
        navigate(SHOW_POST_PATH.replace(':id', `${createdPost.id}`));
      })
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <Typography align="center" component="h1" variant="h5">
        Post
      </Typography>
      <TextField
        {...register("title", {
          required: true
        })}
        InputLabelProps={{ shrink: true }}
        name="title"
        margin="normal"
        fullWidth
        label="Title"
        autoFocus
      />
      <TextField
        {...register("createdBy", {
          required: true
        })}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        fullWidth
        label="Author"
      />
      <TextField
        {...register("content", {
          required: true
        })}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        fullWidth
        label="Content"
        multiline
        rows={20}
      />
      <Box textAlign="center">
        <Button
          type="submit"
          variant="contained"
          sx={{ minWidth: '150px' }}
        >
          Save
        </Button>
      </Box>
    </Box>
  )
}