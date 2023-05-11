import {
  Comment,
  CommentOutlined,
  Favorite,
  FavoriteBorder,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { ToastContext } from "../contexts/ToastContext";
import commentService from "../services/comment.service";
import postService from "../services/post.service";

export default function NewPostPage() {
  const [post, setPost] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [status, setStatus] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [communities, setCommunities] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    community: '',
    body: "",
    career: "",
  });
  const { setMessage, setSeverity } = useContext(ToastContext);
  const { likePost, convertTime } = useContext(GlobalContext);

  const { communityId, postId } = useParams();

  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const getPost = () => {
    postService
      .get(postId)
      .then(({ data }) => {
        console.log("Get posts data: ", data);
        setPost(data);
      })
      .catch(({ response }) => {
        setMessage(response.data.message);
        setSeverity("error");
      });
  };

  const createPost = (e) => {
    e.preventDefault();
    const obj = { ...newPost, author: auth().id };
    postService
      .create(obj)
      .then(({ data }) => {
        console.log(data)

        navigate(`/dashboard/posts/${data.data._id}`);
        setNewPost({ title: "", body: "", community: '', career: "" });
        setMessage(data.message);
        setSeverity("success");
      })
      .catch(({ response }) => {
        setMessage(response.data.message);
        setSeverity("error");
      });
  };

  const deletePost = () => {
    postService
      .delete(postId)
      .then(({ data }) => {
        setMessage(data.message);
        setSeverity("success");
        navigate(`/dashboard/${communityId}`);
      })
      .catch(({ response }) => {
        console.log(response);
        setMessage(response.data.message);
        setSeverity("error");
      });
  };

  const like = () => {
    if (isAuthenticated()) {
      let newValue = likeCount;
      let newStatus;
      if (status === "liked") {
        newValue--;
        newStatus = "disliked";
      } else {
        newValue++;
        newStatus = "liked";
      }
      setStatus(newStatus);
      setLikeCount(newValue);
      const response = likePost(post._id);
      if (response === "error") {
        if (newStatus === "liked") {
          setStatus("disliked");
          console.log(newValue);
          newValue--;
          setLikeCount(newValue);
        } else {
          setStatus("liked");
          console.log(newValue);
          newValue++;
          setLikeCount(newValue);
        }
      }
    } else {
      setMessage("You must be logged in to like post");
      setSeverity("error");
    }
  };

  const handleClick = () => {
    navigate(`/dashboard/posts/${post._id}`);
  };

  useEffect(() => {
      const result = localStorage.getItem("communities")
      result && setCommunities(JSON.parse(result))
  }, []);

  useEffect(() => {

    console.log(newPost)
  }, [newPost.community]);

  return (
    <Grid container item mt="62px" p={{ xs: 2, sm: 7 }} flexGrow={1} width='100%'>
        <form onSubmit={createPost} style={{width: '100%'}}>
        <Grid container item direction="column" xs={12} gap={4}>
        <Typography variant="h3">Create New Post</Typography>
            <FormControl required={true} fullWidth>
              <InputLabel id="communitySelector">Community</InputLabel>
              <Select
                name="communitySelector"
                onChange={(e) =>
                    setNewPost({ ...newPost, community: e.target.value })
                }
                label='Community'
                value={newPost.community}
                type="text"
                required={true}
                fullWidth
              >
                  <MenuItem value="" disabled={true}>
                    <em>Select a community</em>
                  </MenuItem>
                {communities.length !== 0 && communities.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Title"
              type="text"
              required
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <TextField
              label="Body"
              required
              value={newPost.body}
              minRows={10}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <TextField
              label="Career"
              required
              value={newPost.career}
              onChange={(e) =>
                setNewPost({ ...newPost, career: e.target.value })
              }
            />
            <Button type="submit" variant='contained' size="large">Create Post</Button>
        </Grid>
        </form>
      </Grid>
  );
}
