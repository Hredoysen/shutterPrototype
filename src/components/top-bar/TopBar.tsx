import './TopBar.scss'
import {Button} from "antd";
import {signOut} from "firebase/auth";
import {auth} from "../../Firebase.tsx";
import {useDispatch} from "react-redux";

function TopBar() {
    const dispatch = useDispatch()

    const logOut = () => {
        signOut(auth).then((cred) => {
            dispatch({type: 'SET_USER_DATA', payload: []});
            console.log(cred)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (

        <div>
            <Button ghost onClick={logOut} type="primary" shape="round" size='large'>
                Sign Out
            </Button>
        </div>

    )
}

export default TopBar
