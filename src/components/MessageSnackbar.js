import React, { useContext, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import { Alert } from '@mui/material';
import { ListingContext } from '../contexts/ListingContext';

export default function MessageSnackbar() {
    const {message, setMessage, messageStatus} = useContext(ListingContext)

  const [state, setState] = useState({
    open: false,
    Transition: Fade,
    vertical: 'bottom',
    horizontal: 'center'
  });

  const {open, Transition, vertical, horizontal} = state

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    })
    setMessage('')
  };

  useEffect(()=> {
      if (message) { 
          setState({...state, open: true})
      }
  },[message])

  return (
    <div>
      <Snackbar
        anchorOrigin={{vertical, horizontal}}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={Transition}
        message={message}
        key={Transition.name}
        >
               <Alert onClose={handleClose} severity={messageStatus}>
      {message}
   </Alert>
      </Snackbar>
    </div>
  );
}