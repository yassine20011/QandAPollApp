import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from '../context/AuthContext';



export default function PrivateRoute({ component: Component, ...rest }) {
    

    const { user } = useContext(AuthContext);

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Component/> : <Navigate to="/login" />;
}