import {Suspense, useEffect, useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Skeleton} from 'antd';
import AppRoute from '../components/routes/AppRoute';
import PrivateRoute from '../components/routes/PrivateRoute';
import type {IAppRouteConfig} from '../app/configs/routes';
import {appRoutes} from '../app/configs/routes';
import PublicRoute from '../components/routes/PublicRoute';
import {Auth} from "../components/auth/Auth";
import publicRoutes from "../app/configs/routes/publicRoutes.ts";
import AuthorityGuard from "../components/routes/AuthorityGuard.tsx";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../Firebase.tsx";
import {doc, getFirestore, getDoc} from "firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import { setUserData } from '../app/reducer/userActions.ts';


function AllRoutes() {

    const dispatch = useDispatch();


    const [user, setUser] = useState<any | null>(null);
    const [isFetching, setFetching] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);


                const db = getFirestore();
                const userDocRef = doc(db, 'user', user.uid);
                try {
                    const docSnapshot = await getDoc(userDocRef);
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        dispatch({ type: 'SET_USER_DATA', payload: userData });
                        if (docSnapshot.data()){
                            setFetching(false);
                        }
                    } else {
                        console.log('User data not found');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
                return;
            }
            setUser(null);
            setFetching(false)
        });
        return () => unsubscribe();
    }, []);


    if (isFetching) {
        return (
            <div>
                <Skeleton
                    className="bg-white dark:bg-[#0A0A0A] p-10"
                    active
                    paragraph={{rows: 30}}
                />
            </div>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute user={user}/>}>
                {appRoutes.map((route: IAppRouteConfig) => {
                    return (
                        <Route
                            key={route.key}
                            path={route.path}
                            element={
                                <AuthorityGuard  authority={route?.authority}>
                                    <AppRoute component={route.component}/>
                                </AuthorityGuard>
                            }
                        />
                    );
                })}
                <Route path="*" element={<Navigate to="/error-not-found" replace/>}/>
            </Route>
            <Route path="/" element={<PublicRoute user={user}/>}>
                <Route path="/sign-in" element={<Auth type={'sign-in'}/>}/>
                <Route path="/sign-up" element={<Auth type={'sign-up'}/>}/>
                <Route path="/forgot" element={<Auth type={'forgot'}/>}/>
                {publicRoutes.map((route: IAppRouteConfig) => {
                    return (
                        <Route
                            key={route.key}
                            path={route.path}
                            element={<AppRoute component={route.component}/>}
                        />
                    );
                })}
            </Route>
        </Routes>
    );
}

function Views(props: any) {
    return (
        <Suspense
            fallback={
                <div>
                    <Skeleton
                        className="bg-white dark:bg-[#0A0A0A] p-10"
                        active
                        paragraph={{rows: 30}}
                    />
                </div>
            }
        >
            <AllRoutes {...props} />
        </Suspense>
    );
}

export default Views;
