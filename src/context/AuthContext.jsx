import { createContext, useState, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [loggedInUser, setLoggedInUser] = useState();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigateTo = useNavigate();

    // Register
    const postRegister = async function (formData) {
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            // if error, throw error
            if(!response.ok) {
                setIsLoading(false);
                throw data;
            }
            
            // if success, redirect login page
            navigateTo('/login');
            setIsLoading(false);
            toast.success(data.message, {
                position: 'top-center'
            });
        } catch (e) {
            let message = e.message;
            let errors = e.errors;
            let detailErrors = [];

            if(errors) {
                for(let key in errors) {
                    detailErrors.push(...errors[key]);
                }
            }

            setError(detailErrors.length ? detailErrors.join(', ') : message);
        }
    }

    // Login
    const postLogin = async function (formData) {  
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            // if error, throw error
            if(!response.ok) {
                setIsLoading(false);
                throw data;
            }

            // if success, set loggedInUser and redirect to schedules page              
            setIsLoading(false);
            setLoggedInUser(data.data);
            navigateTo('/court-schedules');
            toast.success(data.message, {
                position: 'top-center'
            });

        } catch (e) {
            let message = e.message;
            let errors = e.errors;
            let detailError = [];
            
            if(errors) {
                for(let key in errors) {
                    detailError.push(...errors[key]);
                }
            }
            
            setError(detailError.length ? detailError.join(" | ") : message);
        }
    }

    // Logout
    const postLogout = async function (formData) {  
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${loggedInUser.accessToken}`,
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                },
            });
            const data = await response.json();

            // if error, throw error
            if(!response.ok) {
                setIsLoading(false);
                throw data;
            }

            // if success, set loggedInUser to null        
            setLoggedInUser(null);
            setIsLoading(false);
            navigateTo('/');

            toast.success(data.message, {
                position: 'top-center'
            });

        } catch (e) {
            let message = e.message;
            let errors = e.errors;
            let detailError = [];
            
            if(errors) {
                for(let key in errors) {
                    detailError.push(...errors[key]);
                }
            }
            
            setError(detailError.length ? detailError.join(" | ") : message);
        }
    }

    return (
        <AuthContext.Provider value={{
            loggedInUser, 
            setLoggedInUser,
            postLogin,
            postLogout,
            postRegister,
            error,
            isLoading,
        }}>
            <Outlet />
        </AuthContext.Provider>
    )
}