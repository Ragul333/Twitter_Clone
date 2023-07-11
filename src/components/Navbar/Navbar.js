import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const location = useLocation();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.users);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    }
    const handleLogin = () => {
        navigate('/');
    }
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [location, data])
    return <>
        <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand ml-2" href="#"> TWITTER CLONE</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link"><Link to={'/home'} id="anchor">Home</Link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"><Link to={'/users'} id="anchor">Users</Link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"><Link to={'/following'} id="anchor">Following</Link></a>
                    </li>
                    </ul>
                    <ul class="navbar-nav  ms-auto">
                    <li class="nav-item align-items-center" style={{ marginLeft: '-150%' }}>
                        <div class="dropdown d-flex">
                            <p style={{color:'white'}} className="dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">{user ? user?.result?.username : ""}</p>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="cursor dropdown-item" onClick={user?.result?.username ? handleLogout : handleLogin}>{`${user?.result?.username ? "SignOut" : "SignIn"}`}</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </>
}

export default Navbar;