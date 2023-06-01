import './App.css';
import { createTheme, unstable_createMuiStrictModeTheme } from '@mui/material';
import Landing from './components/Landing';
import { ThemeProvider } from '@emotion/react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import UserWrapper from './components/UserWrapper';
import LoginForm from './components/UserLoginForm';
import RegistrationForm from './components/UserRegistrationForm';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import ResetForm from './components/UserResetForm';
import ForgotForm from './components/UserForgotForm';
import userService from './services/user.service';
import UserVerifyCard from './components/UserVerifyCard';
import DashboardDrawer from './components/DashboardDrawer';
import { light } from '@mui/material/styles/createPalette';
import { ToastContext } from './contexts/ToastContext';
import DashboardNav from './components/DashboardNav';
import PostPage from './pages/Post/PostPage';
import MessageSnackbar from './components/MessageSnackbar';
import NewPostPage from './components/NewPostPage';
import GroupPage from './pages/Group/GroupPage';
import { useAuthUser, useIsAuthenticated, useSignOut } from 'react-auth-kit';
import ProfileForm from './components/UserProfileForm';
import NewGroupPage from './components/GroupNew';
import GroupsPage from './pages/Groups/GroupsPage';
import Dashboard from './components/Dashboard';
// import io from 'socket.io-client'

const theme = createTheme({
  palette: {
    primary: {
      main: '#344FFF',
      hover: 'rgba(89, 111, 255, .8)'
    }
  },
  typography: {
    fontSize: [12, '!important'],
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
      fontSize: "16px"
    },
    body2: {
      fontSize: "16px"
    },
    subtitle1: {
      fontSize: "15px"
    },
    subtitle2: {
      fontSize: '12px'
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
});

// const socket = io('http://localhost:7070')

function App() {

  const { setMessage, setSeverity } = useContext(ToastContext)
  const { setUserImage, setCareer } = useContext(UserContext)
  const { messages, setMessages } = useState([])
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()
  const auth = useAuthUser()
  const signOut = useSignOut()

  useEffect(() => {
    // Listen for chat messages from the server
    // socket.on('new notification', (notification) => {
    //   if (auth().id === notification.originalAuthor) {
    //   setMessage(notification.body);
    //   setSeverity('info')
    //   }
    // });

    // // Clean up the event listener on unmount
    // return () => {
    //   socket.off('new notification');
    // };
  }, []);


  const HomeRedirect = () => {
    return <Navigate to={'/'} />
  }

  const LoginRedirect = () => {
    // setMessage('You must be logged in')
    // setSeverity('error')
    if (window.location.pathname !== '/login') {
      sessionStorage.setItem('redirectUrl', window.location.pathname)
    }
    return <Navigate to={'/login'} />
  }

  // const ProfileRedirect = () => {
  //   setMessage('You must select a PivotPath')
  //   setSeverity('error')
  //   return <Navigate to={`/dashboard/profile/${auth().id}`} />
  // }

  const DashboardRedirect = (route) => {
    if (isAuthenticated()) {
      return <Navigate to='/dashboard' />
    } else {
      return route
    }
  }

  const VerifyLink = () => {
    const { token } = useParams()
    userService.verify(token)
      .then(({ data }) => {
        setMessage(data.message)
        setSeverity('success')
        navigate('/login')
      })
      .catch(({ response }) => {
        setMessage(response.data.message)
        setSeverity('error')
        navigate('/login')
      })
  }

  const ResetLink = () => {
    const { token } = useParams()
    userService.setToken(token)
      .then(({ data }) => {
        window.localStorage.setItem('returned stuff', data)
        setMessage(data.message)
        setSeverity('success')
        navigate('/reset')
      })
      .catch(({ response }) => {
        setMessage(response.data.message)
        setSeverity('error')
        navigate('/login')
      })
  }

  const LogoutRedirect = () => {
    userService.logout()
      .then(() => {
        signOut();
        window.localStorage.clear()
        setUserImage(null)
        setCareer(null)
        setMessage('Session expired. Log in again')
        setSeverity('error')
        navigate('/login')
      })
      .catch(({ response }) => {
        setMessage(response.data.message)
        setSeverity('error')
      })
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <DashboardDrawer>
          <MessageSnackbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={DashboardRedirect(<UserWrapper form={<RegistrationForm />} />)} />
            <Route path='/login' element={DashboardRedirect(<UserWrapper form={<LoginForm />} />)} />
            <Route path='/logout' element={<LogoutRedirect />} />
            <Route path='/forgot' element={DashboardRedirect(<UserWrapper form={<ForgotForm />} />)} />
            <Route path='/reset' element={DashboardRedirect(<UserWrapper form={<ResetForm />} />)} />
            <Route path='/reset/:token' element={DashboardRedirect(<ResetLink />)} />
            <Route path='/verify/:token' element={DashboardRedirect(<VerifyLink />)} />
            <Route path='/verify' element={DashboardRedirect(<UserWrapper form={<UserVerifyCard />} />)} />
            <Route path='/dashboard/profile/:userId' element={<ProfileForm />} />
            <Route path='/dashboard/posts/new' element={isAuthenticated() ?
              <NewPostPage /> : <LoginRedirect />} />
            <Route path='/dashboard/posts/:postId' element={<PostPage />} />
            <Route path='/dashboard/groups' element={<GroupsPage />} />
            <Route path='/dashboard/groups/new' element={isAuthenticated() ?
              <NewGroupPage /> : <LoginRedirect />} />
            <Route path='/dashboard/groups/:groupId' element={<GroupPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="*" element={<HomeRedirect />} />
          </Routes>
        </DashboardDrawer>
      </ThemeProvider>
    </div>
    // https://www.careerpivot.io/verify/${verificationToken}
  );
}

export default App;
