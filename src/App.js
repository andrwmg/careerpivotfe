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
import { UserContext } from './contexts/UserContext';
import ResetForm from './components/UserResetForm';
import ForgotForm from './components/UserForgotForm';
import userService from './services/user.service';
import UserVerifyCard from './components/UserVerifyCard';
import Dashboard from './components/Dashboard';
import DashboardDrawer from './components/DashboardDrawer';
import { light } from '@mui/material/styles/createPalette';
import Posts from './components/Posts';
import { ToastContext } from './contexts/ToastContext';
import DashboardNav from './components/DashboardNav';
import PostPage from './components/PostPage';
import MessageSnackbar from './components/MessageSnackbar';
import NewPostPage from './components/NewPostPage';
import CommunityPage from './components/CommunityPage';
import { RequireAuth, useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import ProfileForm from './components/UserProfileForm';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(89, 111, 255, 1)',
      hover: 'rgba(89, 111, 255, .8)'
    }
  },
  typography: {
    fontSize: '14px',
    button: {
      textTransform: 'inherit'
    },
    h1: {
      fontWeight: 700,
      fontSize: '53px',
      letterSpacing: -3.2
    },
    h2: {
      fontWeight: 600,
      fontSize: "24px",
    },
    h3: {
      fontWeight: 700,
      fontSize: "20px",
    },
    h4: {
      fontSize: "16px",
    },
    h5: {
      fontSize: "14px",
    },
    h6: {
      fontSize: '13px',
      fontWeight: 600
    },
    body1: {
      fontSize: "20px"
    },
    body2: {
      fontSize: "14px"
    },
    subtitle1: {
      fontSize: "16px"
    },
    p: {
      fontSize: '12px',
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
  //     fontSize: ['50px',
  //     color: 'white'
  //   },
  //   h2: {
  //     fontWeight: 500,
  //     fontSize: ["32px",
  //     color: 'white'
  //   },
  //   h3: {
  //     fontWeight: 400,
  //     fontSize: ["29px",
  //     color: 'white'
  //   },
  //   h4: {
  //     fontSize: ["24px",
  //     letterSpacing: '.1em',
  //     textTransform: 'uppercase',
  //     color: 'white'
  //   },
  //   h6: {
  //     color: 'white',
  //     fontWeight: 700
  //   },
  //   body1: {
  //     fontSize: ["16px",
  //     color: 'white'
  //   },
  //   body2: {
  //     fontSize: ["14px",
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

  const { setMessage, setSeverity } = useContext(ToastContext)
  const {career} = useContext(UserContext)
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()
  const auth = useAuthUser()


  const HomeRedirect = () => {
    return <Navigate to={'/'} />
  }

  const LoginRedirect = () => {
    setMessage('You must be logged in')
    setSeverity('error')
    return <Navigate to={'/login'} />
  }

  const ProfileRedirect = () => {
    setMessage('You must select a PivotPath')
    setSeverity('error')
    return <Navigate to={`/dashboard/profile/${auth().id}`} />
  }

  const VerifyLink = () => {
    const { token } = useParams()
    userService.verify(token)
      .then(({ data }) => {
        if (data.messageStatus === 'success') {
          setMessage(data.message)
          setSeverity(data.messageStatus)
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
          setSeverity(data.messageStatus)
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
        <DashboardDrawer>
          <MessageSnackbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<UserWrapper form={<RegistrationForm />} />} />
            <Route path='/login' element={<UserWrapper form={<LoginForm />} />} />
            <Route path='/forgot' element={<UserWrapper form={<ForgotForm />} />} />
            <Route path='/reset' element={<UserWrapper form={<ResetForm />} />} />
            <Route path='/reset/:token' element={<ResetLink />} />
            <Route path='/verify/:token' element={<VerifyLink />} />
            <Route path='/verify' element={<UserWrapper form={<UserVerifyCard />} />} />
            <Route path='/dashboard/profile/:userId' element={<ProfileForm />} />
            <Route path='/dashboard/posts/new' element={isAuthenticated() ? 
                career ? <NewPostPage /> : <ProfileRedirect /> : <LoginRedirect />} />
            <Route path='/dashboard/posts/:postId' element={<PostPage />} />
            <Route path='/dashboard/community/:communityId' element={<CommunityPage />} />

            <Route path='/dashboard' element={<DashboardNav />} />
            <Route path='/dashboard/posts' element={<Posts />} />
            <Route path="*" element={<HomeRedirect />} />
          </Routes>
        </DashboardDrawer>
      </ThemeProvider>
    </div>
    // https://www.careerpivot.io/verify/${verificationToken}
  );
}

export default App;
