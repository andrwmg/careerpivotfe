import './App.css';
import Navbar from './components/Navbar';
import { createTheme, unstable_createMuiStrictModeTheme } from '@mui/material';
import Landing from './components/Landing';
import { ThemeProvider } from '@emotion/react';
import { Navigate, Route, Router, Routes, useNavigate, useParams } from 'react-router-dom';
import UserWrapper from './components/UserWrapper';
import LoginForm from './components/UserLoginForm';
import RegistrationForm from './components/UserRegistrationForm';
import { useContext, useState } from 'react';
import { ListingContext } from './contexts/ListingContext';
import ResetForm from './components/UserResetForm';
import ForgotForm from './components/UserForgotForm';
import userService from './services/user.service';
import UserVerifyCard from './components/UserVerifyCard';
import Dashboard from './components/Dashboard';
import DashboardDrawer from './components/DashboardDrawer';
import { light } from '@mui/material/styles/createPalette';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(89, 111, 255, 1)'
    }
  },
  typography: {
    fontSize: '14px',
    button: {
      textTransform: 'inherit'
    },
    h1: {
      fontWeight: 700,
      fontSize: ['53px', '!important'],
      letterSpacing: -3.2
    },
    h2: {
      fontWeight: 500,
      fontSize: ["32px", '!important'],
    },
    h3: {
      fontWeight: 400,
      fontSize: ["29px", '!important'],
    },
    h4: {
      fontSize: ["20px", '!important'],
    },
    h6: {
      color: 'black',
      fontWeight: 600
    },
    body1: {
      fontSize: ["16px", '!important']
    },
    body2: {
      fontSize: ["14px", '!important']
    },
    p: {
      fontSize: '13px',
      fontWeight: 500,
    },
    fontFamily: [
      'Work Sans',
      'sans-serif'
    ].join(','),
  },
});

const dark = unstable_createMuiStrictModeTheme({
  ...light,
  palette: {
    mode: 'dark'
  }
  // grid: {
  //   '&:.main': {
  //     backgroundColor: 'black',
  //   },
  // },
  // typography: {
  //   h1: {
  //     fontWeight: 700,
  //     fontSize: ['50px', '!important'],
  //     color: 'white'
  //   },
  //   h2: {
  //     fontWeight: 500,
  //     fontSize: ["32px", '!important'],
  //     color: 'white'
  //   },
  //   h3: {
  //     fontWeight: 400,
  //     fontSize: ["29px", '!important'],
  //     color: 'white'
  //   },
  //   h4: {
  //     fontSize: ["24px", '!important'],
  //     letterSpacing: '.1em',
  //     textTransform: 'uppercase',
  //     color: 'white'
  //   },
  //   h6: {
  //     color: 'white',
  //     fontWeight: 700
  //   },
  //   body1: {
  //     fontSize: ["16px", '!important'],
  //     color: 'white'
  //   },
  //   body2: {
  //     fontSize: ["14px", '!important'],
  //     color: 'white'
  //   },
  //   p: {
  //     fontSize: '12px',
  //     fontWeight: 700,
  //     color: 'white'
  //   },
  //   fontFamily: [
  //     'Inter',
  //     'sans-serif'
  //   ].join(','),
  // },
});

function App() {

  const { setMessage, setMessageStatus } = useContext(ListingContext)
  const navigate = useNavigate()


  const HomeRedirect = () => {
    return <Navigate to={'/'} />
  }

  const VerifyLink = () => {
    const { token } = useParams()
    userService.verify(token)
      .then(({ data }) => {
        if (data.messageStatus === 'success') {
          setMessage(data.message)
          setMessageStatus(data.messageStatus)
          navigate('/login')
        } else {
          navigate('/')
        }
      })
  }

  const ResetLink = () => {
    const { token } = useParams()
    userService.setToken(token)
      .then(({ data }) => {
        window.localStorage.setItem('returned stuff', data)
        if (data.messageStatus === 'success') {
          console.log('here')
          setMessage(data.message)
          setMessageStatus(data.messageStatus)
          navigate('/reset')
          // return <Navigate to={'/reset'} />
        } else {
          navigate('/')
        }
      })
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<UserWrapper form={<RegistrationForm />} />} />
            <Route path='/login' element={<UserWrapper form={<LoginForm />} />} />
            <Route path='/forgot' element={<UserWrapper form={<ForgotForm />} />} />
            <Route path='/reset' element={<UserWrapper form={<ResetForm />} />} />
            <Route path='/reset/:token' element={<ResetLink />} />
            <Route path='/verify/:token' element={<VerifyLink />} />
            <Route path='/verify' element={<UserWrapper form={<UserVerifyCard />} />} />
            <Route path='/dashboard' element={<DashboardDrawer />} />
            <Route path="*" element={<HomeRedirect />} />
          </Routes>
        </Navbar>
      </ThemeProvider>
    </div>
    // https://www.careerpivot.io/verify/${verificationToken}
  );
}

export default App;
