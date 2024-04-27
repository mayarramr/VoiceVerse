import logo from './logo.svg';
import './App.css';
import Startup from './Components/Startup/Startup';
import Layout from './Components/Layout/Layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import UserContextProvider from './Context/UserContext';
import CreateUrSong from './Components/CreateUrSong/CreateUrSong';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetCode from './Components/ResetCode/ResetCode';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import Profile from './Components/Profile/Profile';
import StarredContextProvider from './Context/StarredContext';




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
      { path: 'create-your-song', element: <ProtectedRoute><CreateUrSong /></ProtectedRoute> },
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
