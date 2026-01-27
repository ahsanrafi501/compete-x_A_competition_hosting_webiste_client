
import { useState } from "react"

import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);

    const registerUser = (email, password) =>{
        // setLoading(false);
        return createUserWithEmailAndPassword(auth, email, password)
    }




    const authInfo = {
        user,
        // loading,
        registerUser

    }
    return <AuthContext value={authInfo}>{children}</AuthContext>
}

export default AuthProvider;
