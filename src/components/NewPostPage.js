import { Image, Send } from "@mui/icons-material";
import {
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import PostSidebar from "../pages/Post/PostSidebar";
import postService from "../services/post.service";
import GroupSelector from "./GroupSelector";

export default function NewPostPage() {
    const { setMessage, setSeverity } = useContext(ToastContext);
    const { career } = useContext(UserContext);

    const auth = useAuthUser();
    const navigate = useNavigate();

    const [newPost, setNewPost] = useState({
        title: "",
        body: "",
        group: auth().career ? auth().career : { _id: '', title: '' }
    });
    const [errors, setErrors] = useState({ group: '' })

    const setGroup = (value) => {
        setErrors({ ...errors, group: '' })
        setNewPost({ ...newPost, group: value })
    }

    const createPost = (e) => {
        e.preventDefault();
        if (!newPost.group) {
            setErrors({ ...errors, group: 'Select a group' })
        } else {
            postService
                .create({ ...newPost, group: newPost.group._id })
                .then(({ data }) => {
                    navigate(`/dashboard/posts/${data.data._id}`);
                    setMessage(data.message);
                    setSeverity("success");
                })
                .catch(({ response }) => {
                    setMessage(response.data.message);
                    setSeverity("error");
                });
        }
    };

    return (
        <Grid container item px={{ xs: 3, sm: 6 }} flexGrow={1} width='100%' mt={4}>
            <form onSubmit={createPost} style={{ width: '100%' }}>
                <Grid container item direction="column" xs={12} gap={3} sx={{'& .MuiInputBase-root': {fontSize: '13px'}, '& .MuiFormLabel-root': {fontSize: '13px'}}}
>
                    <Typography variant="h3">Write a new post</Typography>
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
                    <GroupSelector group={newPost.group} setGroup={setGroup} error={errors.group} label='Choose a group to post to' required={true} />
                    <TextField
                        label="Title"
                        type="text"
                        required
                        value={newPost.title}
                        size='small'
                        onChange={(e) =>
                            setNewPost({ ...newPost, title: e.target.value })
                        }
                    />
                    <TextField
                        label="What would you like to share?"
                        required
                        value={newPost.body}
                        rows={9}
                        size='small'
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
                    <Grid container item justifyContent='space-between' width='100%' gap={2}>
                        <Grid item direction='column' xs={5.5} sm='auto'>
                            <Button variant='contained' size='small' startIcon={<Image />} sx={{width: '100%'}} disabled={true}>Add image</Button>
                            </Grid>
                            <Box sx={{flexGrow: 1, display: {xs: 'none', sm: 'flex'}}} />
                            <Grid item direction='column' xs={5.5} sm='auto'>

                                <Button variant='outlined' size='small' sx={{width: '100%'}} disabled={
                                    // !newPost.body || !newPost.title || !newPost.group._id
                                    true}>Save as draft</Button>
                            </Grid>
                            <Grid item direction='column' xs={12} sm='auto' maxHeight='35px'>

                                <Button type="submit" variant='contained' size="small" startIcon={<Send />} sx={{width: '100%'}} disabled={!newPost.body || !newPost.title || !newPost.group._id}>Create Post</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
}
