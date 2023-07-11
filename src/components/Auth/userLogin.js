import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UserLogin = ({ isExpired }) => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const user = JSON.parse(localStorage.getItem('user'));
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    // const location = useLocation();
    const history = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const handleAuth = (e) => {
        e.preventDefault();
        dispatch(login(userData));
        history('/home');
    }
    const handleTestAuth = (e) => {
        e.preventDefault();
        dispatch(login({email:'sr@gmail.com', password: 'ragul'}));
        history('/home');
    }
    // useEffect(()=>{
    //     if(user?.result?.username){

    //         history('/home')
    //     }
    // })
    return <div className="container">
        <div className='col-md-4 mx-auto mt-5  form-div'>
            <form class="row g-3">
                <div class="col-md-12">
                    <input type="email" name="email" class="form-control" placeholder="Enter email" onChange={handleChange} />
                </div>
                <div class="col-md-12">
                    <input type="password" name="password" class="form-control" placeholder="Enter password" onChange={handleChange} />
                </div>
                <div class="col-md-6 mx-auto p-2">
                    <button type="submit" class="btn btn-primary" onClick={handleAuth}>SignIn</button>{" "}
                    <Link to={'/register'}> New user ?</Link>
                </div>
                    <button type="submit" class="btn btn-primary" onClick={handleTestAuth}>Login with test credentials</button>{" "}

            </form>
        </div>
    </div>
}

export default UserLogin;