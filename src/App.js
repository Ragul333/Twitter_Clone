import jwtDecode from "jwt-decode";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Form from './components/Form/Form';
import { getPosts } from './actions/posts'
import Posts from './components/Posts.js/Posts';
import UserRegister from './components/Auth/userRegister';
import UserLogin from './components/Auth/userLogin';
import Navbar from './components/Navbar/Navbar';
import FollowersPost from './components/FollowerPost/FollowersPost';
import UserCardParent from './components/Users/user';
import ErrorPopup from "./components/ErrorPopup";

function App() {
  
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const location = useLocation();
  const posts = useSelector((state) => state.posts);


  function isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    if (decodedToken.exp < currentTime) {
      return true; // Token is expired
    }

    return false; // Token is not expired
  }

  // Example usage
  const isExpired = user?.token ? isTokenExpired(user?.token) : "";

  useEffect(() => {

    if (isExpired) {
      console.log('Token has expired', location);
      // window.location.reload()
    } else {
      console.log('Token is still valid', user?.result?._id, location);
    }
  }, [])

  useEffect(() => {

      dispatch(getPosts())
  }, [user?.result?._id,user?.token,currentId,location])
  
  console.log('Component Running ...............',{user,currentId,location});

  return (
    <>
      <Navbar />
      {
        (isExpired && location?.pathname !== '/') && <ErrorPopup />
      }
      <Routes>
        <Route path="/home" element={isExpired ? <></> : <><Form currentId={currentId} setCurrentId={setCurrentId} /><Posts setCurrentId={setCurrentId} /></>} />
        <Route path="/register" element={isExpired ? <></> : <UserRegister />} />
        <Route path="/following" element={isExpired ? <></> : <FollowersPost />} />
        <Route path="/users" element={isExpired ? <></> : <UserCardParent currentId={currentId} setCurrentId={setCurrentId} />} />
        <Route path="/" element={<UserLogin isExpired={isExpired} />} />
      </Routes>
    </>
  );
}

export default App;
