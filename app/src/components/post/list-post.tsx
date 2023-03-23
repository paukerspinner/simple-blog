import { Button, Card, CardActions, CardContent, Grid, IconButton, InputBase, Paper, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IPost } from "../../constants/interface";
import { CREATE_POST_PATH, SHOW_POST_PATH } from "../../utils/routes";
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getAllPost, searchPost } from "../../utils/api";

export default function ListPost() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!!keyword) {
      searchPost({ keyword }).then((matchedPosts: IPost[]) => {
        setPosts(matchedPosts);
      })
    } else {
      fetchAllPosts();
    }
    
  }

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    if (!event.target.value) {
      fetchAllPosts();
    }
  }

  const fetchAllPosts = () => {
    getAllPost().then((fetchPosts: IPost[]) => {
      setPosts(fetchPosts);
    })
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={8}>
        <Toolbar
          disableGutters={true}
        >
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            onSubmit={handleSearch}
          >
            <InputBase
              value={keyword}
              onChange={handleKeywordChange}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button variant="contained" component={Link} sx={{ ml: 'auto' }} to={CREATE_POST_PATH}>Create Post</Button>

        </Toolbar>
      </Grid>

      {posts.map((post: IPost) => {
        return (
          <Grid key={post.id} item xs={8}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.createdBy} - {new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" sx={{ ml: 'auto' }} component={Link} to={SHOW_POST_PATH.replace(':id', `${post.id}`)}>Read More</Button>
              </CardActions>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}