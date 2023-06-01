import styled from "@emotion/styled";
import { Button, Chip, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContext } from "../../contexts/ToastContext";
import groupService from "../../services/group.service";
import Feed from "../../components/Feed";
import GroupVisor from "./GroupVisor";
import { Stack } from "@mui/system";
import { Moving, NorthEast, PunchClock, Schedule, Timer, Whatshot } from "@mui/icons-material";
import postService from "../../services/post.service";

export default function GroupPage() {

    const [group, setGroup] = useState({ title: '' })
    const [active, setActive] = useState('New')

    const { setMessage, setSeverity } = useContext(ToastContext)

    const { groupId } = useParams()

    const getNew = () => {
        // postService.latest({group: groupId})
        // .then(({ data }) => {
        //     setGroup(data)
        // })
        // .catch(({ response }) => {
        //     setMessage(response.data.message)
        //     setSeverity('error')
        // })
        setActive('New')
    }

    const getTop = () => {
        // postService.top({group: groupId})
        // .then(({ data }) => {
        //     setGroup(data)
        // })
        // .catch(({ response }) => {
        //     setMessage(response.data.message)
        //     setSeverity('error')
        // })
        setActive('Top')
    }

    const getHot = () => {
        // postService.hot({group: groupId})
        // .then(({ data }) => {
        //     setGroup(data)
        // })
        // .catch(({ response }) => {
        //     setMessage(response.data.message)
        //     setSeverity('error')
        // })
        setActive('Hot')
    }

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
        <Grid container item gap={3} pt={4} direction='column' maxWidth={{ xs: '100%', md: 'calc(100vw - 256px)' }} zIndex={0} flexGrow={1}>
            <GroupVisor group={group} />
            <Stack direction='row' spacing={2} px={{xs: 3, md: 6}} sx={{'& .MuiChip-root': {px: 1}}}>
                <Chip label='New' variant='contained' color={active === 'New' ? 'primary' : 'default'} icon={<Schedule />} onClick={getNew} />
                <Chip label='Top' variant='contained' color={active === 'Top' ? 'primary' : 'default'} icon={<NorthEast />} onClick={getTop} />
                <Chip label='Hot' variant='contained' color={active === 'Hot' ? 'primary' : 'default'} icon={<Whatshot />} onClick={getHot} />
            </Stack>
            <Feed posts={group.posts ? group.posts : null} />
        </Grid>
    )
}