import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from '../context/AuthContext';
import React from 'react';

interface PrivateRouteProps {
    component: React.ComponentType;
    [key: string]: any;
}


export default function PrivateRoute({ component: Component}: PrivateRouteProps) {
    

    const { user } : any = useContext(AuthContext);

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return (user ? <Component/> : <Navigate to="/login" />);
}