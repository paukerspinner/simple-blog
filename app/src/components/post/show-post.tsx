import { Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IPost } from "../../constants/interface";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EDIT_POST_PATH, HOME_PATH } from "../../utils/routes";
import { useEffect, useState } from "react";
import { deletePost, getPost } from "../../utils/api";

export default function ShowPost() {
  let { id } = useParams();
  var [post, setPost] = useState<IPost>();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    deletePost(parseInt(`${id}`)).then(() => {
      navigate(HOME_PATH);
      handleClose();
    })
  }

  useEffect(() => {
    if (!!id) {
      getPost(parseInt(id)).then((fetchedPost: IPost) => {
        setPost(fetchedPost);
      })
    }
  }, [id]);

  return (
    <Grid container spacing={2} justifyContent="center">
      {!!post && (
        <Grid item xs={8}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 }
            }}
          >
            <Typography sx={{ flex: '1 1 100%' }} variant="h5" textAlign="center">
              {post.title}
            </Typography>
            <IconButton
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: '100px',
                },
              }}
            >
              <MenuItem component={Link} to={EDIT_POST_PATH.replace(':id', `${post.id}`)}>Edit</MenuItem>
              <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
            </Menu>
          </Toolbar>
          <Typography variant="body2" color="text.secondary" textAlign="right">
            {post.createdBy} - {new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2}>
            {post.content}
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}