import React, { useContext, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { Alert } from '@mui/material';
import { ToastContext } from '../contexts/ToastContext';
import { UserContext } from '../contexts/UserContext';

function SlideTransition(props) {
  return <Slide {...props} direction='down' />
}

export default function MessageSnackbar() {
  const { message, setMessage, severity } = useContext(ToastContext)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
    // setTimeout(() => {
    //   setMessage(null)
    // }, 6000)
  };

  useEffect(() => {

    if (message) {
        setOpen(true)
    }
  }, [message])


  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        message={message}
      >
        <Alert variant='filled' onClose={handleClose} severity={severity} sx={{ zIndex: 10 }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}