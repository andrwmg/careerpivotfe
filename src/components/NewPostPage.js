import {
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import postService from "../services/post.service";

export default function NewPostPage() {
    const { setMessage, setSeverity } = useContext(ToastContext);
    const { career } = useContext(UserContext);

    const [newPost, setNewPost] = useState({
        title: "",
        body: "",
        career,
        // group
    });

    const auth = useAuthUser();
    const navigate = useNavigate();

    const createPost = (e) => {
        e.preventDefault();
        const obj = { ...newPost, author: auth().id };
        postService
            .create(obj)
            .then(({ data }) => {
                console.log(data)
                navigate(`/dashboard/posts/${data.data._id}`);
                // setNewPost({ title: "", body: "", career });
                setMessage(data.message);
                setSeverity("success");
            })
            .catch(({ response }) => {
                setMessage(response.data.message);
                setSeverity("error");
            });
    };

    useEffect(() => {
        if (career) {
            setNewPost({ ...newPost, career })
        }
    }, []);

    return (
        <Grid container item mt={4} px={{ xs: 3, sm: 6 }} flexGrow={1} width='100%'>
            <form onSubmit={createPost} style={{ width: '100%' }}>
                <Grid container item direction="column" xs={12} gap={2}>
                    <Typography variant="h3">Create New Post</Typography>
                    {/* <FormControl required={true} fullWidth>
                        <InputLabel id="groupSelector">Group</InputLabel>
                        <Select
                            name="groupSelector"
                            onChange={(e) =>
                                setNewPost({ ...newPost, group: e.target.value })
                            }
                            label='Group'
                            value={newPost.group}
                            type="text"
                            required={true}
                            fullWidth
                        >
                            <MenuItem value="" disabled={true}>
                                <em>Select a group</em>
                            </MenuItem>
                            {groups.length !== 0 && groups.map((item) => (
                                <MenuItem key={item._id} value={item._id}>
                                    {item.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
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
                        rows={10}
                        multiline
                        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    />
                    {/* <TextField
              label="Career"
              required
              value={newPost.career}
              onChange={(e) =>
                setNewPost({ ...newPost, career: e.target.value })
              }
            /> */}
                    <Button type="submit" variant='contained' size="large">Create Post</Button>
                </Grid>
            </form>
        </Grid>
    );
}
