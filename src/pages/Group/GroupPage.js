import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContext } from "../../contexts/ToastContext";
import groupService from "../../services/group.service";
import Feed from "../../components/Feed";

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