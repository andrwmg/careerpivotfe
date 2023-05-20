import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import { useAuthUser } from 'react-auth-kit';

const ITEM_HEIGHT = 48;

export default function CommentMenu({comment, toggleEditing, toggleReplying}) {

const auth = useAuthUser()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditing = () => {
      toggleEditing()
      handleClose()
  }

  const handleReplying = () => {
      toggleReplying()
      handleClose()
  }

  const handleDeleting = () => {
      console.log('gonna delete')
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon color='primary' sx={{ fontSize: '16px' }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        sx={{left: '-30px', '& .MuiButtonBase-root': {
            fontSize: '14px'
        }}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '10ch',
          },
        }}
      >
          {comment.author._id === auth().id ?
          <Box>
          <MenuItem onClick={handleDeleting}>
            Delete
          </MenuItem>
          <MenuItem onClick={handleEditing}>
            Edit
          </MenuItem>
          </Box>
          : null}
          <MenuItem onClick={handleReplying}>
            Reply
          </MenuItem>
      </Menu>
    </div>
  );
}