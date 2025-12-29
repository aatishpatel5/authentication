import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
 

function userGetCurrentUser() {
    const dispatch = useDispatch();

    useEffect(()=> {
        const fetchUser = async () => {
            try {
                console.log("in userGetCurrentUser errro check")
                const result = await axios.get(`${serverUrl}/api/user/current_user`, {
                    withCredentials: true,
                })
                console.log(`check 1 setUserdata give ya not give:`, result)
                dispatch(setUserData(result))
            } catch (error) {
                console.log(error)
            }
        };
        fetchUser()
    },[])
}

export default userGetCurrentUser;