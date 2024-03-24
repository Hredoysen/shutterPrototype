import {Navigate, Outlet} from 'react-router-dom';

function PrivateRoute(user) {
    if (!user.user) {
        return <Navigate to="/sign-in" replace/>;
    }
    return <Outlet/>;
}

export default PrivateRoute;
