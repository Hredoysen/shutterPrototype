import {useLayoutEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {IAppRoute} from './types/approute';

function AppRoute({component: Component, ...props}: IAppRoute) {
    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return <Component {...props} />;
}

export default AppRoute;
