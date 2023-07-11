import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../actions/user";
import { Link, useNavigate } from "react-router-dom";

const UserRegister = () => {
    const [userData, setUserData] = useState({ username: "", email: "", password: "" });
    const dispatch = useDispatch();
    const history = useNavigate();
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const handleAuth = (e) => {
        e.preventDefault();
        dispatch(register(userData));
        history('/');
    }
    return <div className="container">
        <div className='col-md-6 mx-auto mt-5 form-div'>
            <form class="row g-3">
                <div class="col-md-12">
                    <input type="text" name="username" class="form-control" placeholder="Enter a unique username" onChange={handleChange} />
                </div>
                <div class="col-md-12">
                    <input type="email" name="email" class="form-control" placeholder="Enter email" onChange={handleChange} />
                </div>
                <div class="col-md-12">
                    <input type="password" name="password" class="form-control" placeholder="Enter password" onChange={handleChange} />
                </div>
                <div class="col-md-4 mx-auto">
                    <button type="submit" class="btn btn-primary" onClick={handleAuth}>Register</button>{" "}
                    <Link to={'/'}> Existing user ?</Link>

                </div>
            </form>
        </div>
    </div>
}

export default UserRegister;