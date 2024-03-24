import {Button} from "antd";
import {signOut} from "firebase/auth";
import {auth} from "../../Firebase.tsx";

function AuthLanding() {


    const logOut = () => {
        signOut(auth).then((cred) => {
            console.log(cred)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <Button ghost onClick={logOut} type="primary" shape="round" size='large'>
                Sign Out
            </Button>
        </>
    );
}

export default AuthLanding;
