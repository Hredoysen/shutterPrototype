import {Button} from "antd";
import {signOut} from "firebase/auth";
import {auth} from "../../Firebase.tsx";
import {useSelector} from "react-redux";

function AuthLanding() {
    const user = useSelector(state => state);
    const logOut = () => {
        signOut(auth).then((cred) => {
            console.log(cred)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            {user.userData.userType === 'admin' && 'Hello Admin'}
            <Button ghost onClick={logOut} type="primary" shape="round" size='large'>
                Sign Out
            </Button>
        </>
    );
}

export default AuthLanding;
