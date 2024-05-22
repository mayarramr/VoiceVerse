import logo from './logo.svg';
import './App.css';
import Startup from './Components/Startup/Startup';
import Layout from './Components/Layout/Layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import UserContextProvider from './Context/UserContext';
import Reels from './Components/Reels/Reels';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetCode from './Components/ResetCode/ResetCode';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import Profile from './Components/Profile/Profile';
import StarredContextProvider from './Context/StarredContext';
import UserPassChange from './Components/UserPassChange/UserPassChange';
import UserVideos from './Components/Profile/UserVideos/UserVideos';
import Favorites from './Components/Profile/Favorites/Favorites';
import Dubbing from './Components/Dubbing/Dubbing';
import Avatar from './Components/Avatar/Avatar';
import Clonning from './Components/Clonning/Clonning';
import DubbingResults from './Components/Dubbing/DubbingResults/DubbingResults';

let routers = createBrowserRouter([
  { index: true, element: <Startup /> },
  { path: 'signup', element: <SignUp /> },
  { path: 'login', element: <Login /> },
  { path: 'forget-password', element: <ForgetPassword /> },
  { path: 'reset-code', element: <ResetCode /> },
  { path: 'change-password', element: <ChangePassword /> },
  {
    path: "/", element: <Layout />, children: [
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'reels', element: <ProtectedRoute><Reels /></ProtectedRoute> },
      { path: 'dubbing', element: <ProtectedRoute><Dubbing /></ProtectedRoute> },
      { path: 'avatar', element: <ProtectedRoute><Avatar /></ProtectedRoute> },
      { path: 'clonning', element: <ProtectedRoute><Clonning /></ProtectedRoute> },
      { path: 'change-your-password', element: <ProtectedRoute><UserPassChange /></ProtectedRoute> },
      { path: 'profile/userVideos', element: <ProtectedRoute><UserVideos /></ProtectedRoute> },
      { path: 'profile/favorites', element: <ProtectedRoute><Favorites /></ProtectedRoute> },
      { path: 'profile/dubbing-results', element: <ProtectedRoute><DubbingResults /></ProtectedRoute> },
    ]
  }
])


export default function App() {
  return <>
    <UserContextProvider>
    <StarredContextProvider>
      <RouterProvider router={routers}></RouterProvider>
    </StarredContextProvider>
    </UserContextProvider>
  </>
}
