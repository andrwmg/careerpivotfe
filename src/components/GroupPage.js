import styled from "@emotion/styled";
import { SettingsOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useLocation, useParams } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import groupService from "../services/group.service";
import postService from "../services/post.service";
import GroupVisor from "./GroupVisor";
import Feed from "./Feed";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";
import SmallCardRow from "./SmallCardRow";

const TextButton = styled(Button)(({ theme }) => ({
    color: 'rgba(89, 111, 255, 1)',
    fontWeight: 500,
    letterSpacing: -.14,
    textTransform: 'inherit',
    border: '2px solid rgba(89, 111, 255, 1)',
    borderRadius: '8px',
    paddingLeft: 10,
    paddingRight: 10
}))

const MainButton = styled(TextButton)(({ theme }) => ({
    color: grey[50],
    fontSize: '20px',
    padding: '18px 48px',
    boxShadow: 'none',
    lineHeight: '20px'
}))

export default function GroupPage() {

    const [group, setGroup] = useState({ title: '' })

    const { setMessage, setSeverity } = useContext(ToastContext)

    const { groupId } = useParams()

    useEffect(() => {
        groupService.get(groupId)
            .then(({ data }) => {
                setGroup(data)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }, [groupId])

    return (
        <Grid container item gap={4} mt="62px" direction='column' maxWidth={{ xs: '100%', md: 'calc(100vw - 256px)' }} zIndex={0} flexGrow={1}>
            <groupVisor group={group} />
            <Feed posts={group.posts} />
        </Grid>
    )
}