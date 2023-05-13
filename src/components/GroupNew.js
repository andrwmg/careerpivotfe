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
import { UserContext } from "../contexts/UserContext";
import commentService from "../services/comment.service";
import groupService from "../services/group.service";
import postService from "../services/post.service";

export default function NewGroupPage() {
    const { setMessage, setSeverity } = useContext(ToastContext);
    const { career } = useContext(UserContext);

    const [newGroup, setNewGroup] = useState({
        title: "",
        tagline: "",
        career: '',
    });

    const auth = useAuthUser();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    const createGroup = (e) => {
        e.preventDefault();
        const obj = { ...newGroup, author: auth().id };
        groupService
            .create(obj)
            .then(({ data }) => {
                console.log(data)
                navigate(`/dashboard/groups/${data.data._id}`);
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
            setNewGroup({ ...newGroup, career })
        }
    }, []);

    return (
        <Grid container item mt={4} px={{ xs: 3, sm: 6 }} flexGrow={1} width='100%'>
            <form onSubmit={createGroup} style={{ width: '100%' }}>
                <Grid container item direction="column" xs={12} gap={2}>
                    <Typography variant="h3">Create New Group</Typography>
                    <TextField
                        label="Career"
                        type="text"
                        required
                        value={newGroup.career}
                        onChange={(e) =>
                            setNewGroup({ ...newGroup, career: e.target.value })
                        }
                    />
                    <TextField
                        label="Title"
                        type="text"
                        required
                        value={newGroup.title}
                        onChange={(e) =>
                            setNewGroup({ ...newGroup, title: e.target.value })
                        }
                    />
                    <TextField
                        label="Tagline"
                        required
                        value={newGroup.tagline}
                        rows={5}
                        multiline
                        onChange={(e) => setNewGroup({ ...newGroup, tagline: e.target.value })}
                    />
                    {/* <TextField
              label="Career"
              required
              value={newGroup.career}
              onChange={(e) =>
                setnewGroup({ ...newGroup, career: e.target.value })
              }
            /> */}
                    <Button type="submit" variant='contained' size="large">Create Group</Button>
                </Grid>
            </form>
        </Grid>
    );
}
