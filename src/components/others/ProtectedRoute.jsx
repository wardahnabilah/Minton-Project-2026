import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router";
import { toast } from "react-toastify";

export function ProtectedRoute({role}) {
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
    const navigateTo = useNavigate();

    useEffect(() => {
        if(loggedInUser === undefined) {
            toast.error('Please log in first');

            navigateTo('/login', { replace: true });
        }

        if(role === 'admin' && (loggedInUser.role !== 'admin')) {
            toast.error("You don't have permission to access this page");
            navigateTo('/', { replace: true });
        }
    },[navigateTo, loggedInUser]);

    return loggedInUser && <Outlet />
}