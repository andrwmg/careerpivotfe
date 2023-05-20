import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../contexts/UserContext';
import { useAuthUser } from 'react-auth-kit';

function stringAvatar(name) {
    return {
        children: `${name.split(' ')[0][0].toUpperCase()}`,
    };
}

export default function AvatarDefault({ username, size, fontSize, src }) {
    // const {userImage} = React.useContext(UserContext)
    const [userImage, setUserImage] = React.useState(null)
    const auth = useAuthUser()

    React.useLayoutEffect(() => {
        if (auth().image) {
            setUserImage(auth().image.url)
        }
    }, [])

    return (
        userImage ?
                <Avatar src={src || userImage} alt='' sx={{height: size || '37px', width: size || '37px'}} />
                :
                <Avatar {...stringAvatar(username ? username : auth().username)} sx={{ fontSize: fontSize ? fontSize : `calc(${size} * .60)`, fontWeight: 700, height: size || '37px', width: size || '37px', bgcolor: 'primary.main' }} />
    );
}