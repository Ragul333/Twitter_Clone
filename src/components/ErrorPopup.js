import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ErrorPopup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAuth = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/')
    }
    return <div className="d-flex justify-content-center mt-5">
        <p className="font-bold">
            Session expired <em className="text-primary" style={{cursor:'pointer'}} onClick={handleAuth}>Login</em> to continue
        </p>
    </div>
}

export default ErrorPopup;