import { Button, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useLocation, useParams } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import communityService from "../services/community.service";

export default function CommunityVisor({ community }) {

    const [memberCount, setMemberCount] = useState(0)
    const [member, setMember] = useState(false)

    const { setMessage, setSeverity } = useContext(ToastContext)
    const { communities, setCommunities } = useContext(UserContext)
    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()

    const { communityId } = useParams()

    const location = useLocation()

    const handleClick = () => {
        let isMember = !member
        let count = memberCount
        if (member) {
            setMemberCount(count - 1)
        } else {
            setMemberCount(count + 1)
        }
        setMember(isMember)
        communityService.join(communityId, auth())
            .then(({ data }) => {
                let newData
                if (communities.map(comm => comm._id).includes(community._id)) {
                    newData = communities.filter(comm => comm._id !== community._id)
                } else {
                    newData = [...communities, community]
                }
                setCommunities(newData)
                localStorage.setItem('communities', JSON.stringify(newData))
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
        if (community.members) {
        setMemberCount(community.members.length)
        setMember(community.members.map(member => member.user).includes(auth().id))
        }
}, [community])

return (
    <Grid container item gap={4} alignItems='start' px={{xs: 3, md: 6}} bgcolor='white' color='primary.main' justifyContent='space-between' borderBottom='1px solid #cbcbcb' py={4}>
        <Stack spacing={1}>
        <Typography variant='h4'>{community.title}</Typography>
        <Typography variant='body1'>{`${memberCount} ${memberCount > 1 || memberCount === 0 ? 'members' : 'member'}`}</Typography>
        </Stack>
        {member ?
            <Button variant="contained" onClick={handleClick}>Joined</Button>
            :
            <Button onClick={handleClick}>Join</Button>
        }
    </Grid>
)
}