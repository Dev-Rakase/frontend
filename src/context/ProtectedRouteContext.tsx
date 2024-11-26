import React, { createContext, useEffect, useState } from "react"
import { auth } from "../libs/auth"
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface IAuthContext {
    user: User | null,
}

interface IAuthContextProvider {
    children: React.ReactNode
}


/* *
 * can export to use access user object without calling / hit database api
 * - Benefit
 * - reduce backend bandwidth
 * - can reduce load on server
 * - better performance on frontend  
 * */

const AuthContext = createContext<IAuthContext>({ user: null })


export default function ProtectedRouteContext({ children }: IAuthContextProvider) {
    const [user, setUser] = useState(auth.currentUser)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    if (loading) {
        return <p>Loading...</p>
    }

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    )
}
