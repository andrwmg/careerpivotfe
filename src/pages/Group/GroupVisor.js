import { Button, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import { ToastContext } from "../../contexts/ToastContext";
import { UserContext } from "../../contexts/UserContext";
import groupService from "../../services/group.service";
import career from '../../assets/career.png'

export default function GroupVisor({ group }) {

    const [memberCount, setMemberCount] = useState(0)
    const [member, setMember] = useState(false)

    const { setMessage, setSeverity } = useContext(ToastContext)
    const { groups, setGroups } = useContext(UserContext)
    const auth = useAuthUser()

    const { groupId } = useParams()

    const handleClick = () => {
        let isMember = !member
        let count = memberCount
        if (member) {
            setMemberCount(count - 1)
        } else {
            setMemberCount(count + 1)
        }
        setMember(isMember)
        groupService.join(groupId, auth())
            .then(({ data }) => {
                let newData
                if (groups.map(comm => comm._id).includes(group._id)) {
                    newData = groups.filter(comm => comm._id !== group._id)
                } else {
                    newData = [...groups, group]
                }
                setGroups(newData)
                localStorage.setItem('groups', JSON.stringify(newData))
                setMessage(data.message)
                setSeverity('success')
            })
            .catch(({ response }) => {
                setMember(!isMember)
                setMemberCount(count)
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

    useEffect(() => {
        if (group.members) {
            setMemberCount(group.members.length)
            setMember(group.members.map(member => member.user).includes(auth().id))
        }
    }, [group])

    return (
        <Grid container item gap={4} alignItems='center' px={{ xs: 3, md: 6 }} bgcolor='white' color='primary.main' borderBottom='1px solid rgba(62,85,205,.2)
        ' pb={3} wrap='nowrap'>
            <img src={career} style={{width: '65px', height: '65px'}} />
            <Stack spacing={1}>
                <Grid container item gap={2}>
                <Typography variant='h2' color='black'>
                    {group.title}
                </Typography>
                <Button variant={member ? "contained": "outlined"} onClick={handleClick} size='small'>{member ? 'Joined' : 'Join'}</Button>
            </Grid>
                <Typography variant='body1'>
                    {`${memberCount} ${memberCount > 1 || memberCount === 0 ? 'members' : 'member'}`}
                </Typography>
            </Stack>
        </Grid>
    )
}