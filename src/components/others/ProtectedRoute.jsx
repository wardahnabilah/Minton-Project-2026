import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router";

export function ProtectedRoute({children}) {
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
    const navigateTo = useNavigate();

    useEffect(() => {
        if(loggedInUser?.role !== 'admin') {
            navigateTo({
                pathname: '/',
                state: {
                    message: "Sorry, you don't have permission to this page"
                },
            });
        }
    }, [loggedInUser]);

    return <Outlet />
}