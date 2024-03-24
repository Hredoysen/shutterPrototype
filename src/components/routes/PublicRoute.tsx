import {Navigate, Outlet} from 'react-router-dom';

function PublicRoute(user) {
    return user.user ? <Navigate to="/"/> : <Outlet/>;
}

export default PublicRoute;
