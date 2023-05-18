import {
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import groupService from "../services/group.service";

export default function NewGroupPage() {
    const { setMessage, setSeverity } = useContext(ToastContext);
    const { career, expiredLogout } = useContext(UserContext);

    const [newGroup, setNewGroup] = useState({
        title: "",
        tagline: "",
    });

    const navigate = useNavigate()
    const auth = useAuthUser();

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
                expiredLogout(response)
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
                    {/* <TextField
                        label="Career"
                        type="text"
                        required
                        value={newGroup.career}
                        onChange={(e) =>
                            setNewGroup({ ...newGroup, career: e.target.value })
                        }
                    /> */}
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
                    <Button type="submit" variant='contained' size="large">Create Group</Button>
                </Grid>
            </form>
        </Grid>
    );
}
