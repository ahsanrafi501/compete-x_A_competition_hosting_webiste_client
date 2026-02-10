import React from 'react';
import useAuth from '../Hook/useAuth';
import Loading from '../Page/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation()

    if(loading){
        return <Loading></Loading>
    }

    if(!user){
        return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }



    return children;x
};

export default PrivateRoute;