import { InputForm } from "../../components/elements/InputForm"
import { ButtonBtn } from "../../components/elements/Buttons"
import { ErrorAlert } from "../../components/elements/ErrorAlert";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
    const [formData, setFormData] = useState({email : '', password : ''});
    const [token, setToken] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigateTo = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const postLogin = async function () {  
            try {
                const response = await fetch(`${BASE_URL}/api/v1/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();

                //if error, throw error
                if(!response.ok) {
                    setIsLoading(false);
                    throw data;
                }

                // if success, set token and redirect to schedules page              
                setIsLoading(false);
                setToken(data.data.accessToken);
                navigateTo('/schedules');

            } catch (e) {
                let message = e.message;
                let errors = e.errors;
                let detailError = [];
                
                if(errors) {
                    for(let key in errors) {
                        detailError.push(...errors[key]);
                    }
                }
                
                setError(detailError.length ? detailError.join("\n") : message);
            }

        }

        postLogin();
    }

    return (
        <section className="py-28">
            <h1 className="text-2.5xl text-center font-bold uppercase tracking-wider">Login</h1>
            <ErrorAlert message={error}/>

            <form onSubmit={handleSubmit} id="loginForm" className="flex flex-col gap-5 w-9/12 max-w-sm mx-auto mt-10 text-lg">
                <InputForm
                    label="Email"
                    name="email"
                    onChange={e => setFormData((prev) => ({...prev, email: e.target.value}))}
                />
                <InputForm
                    label="Password"
                    name="password"
                    type="password"
                    onChange={e => setFormData((prev) => ({...prev, password: e.target.value}))}
                />

                <ButtonBtn className="mt-8" disabled={isLoading}>{!isLoading ? 'Login' : 'Loading...' }</ButtonBtn>
            </form>

            <div className="text-center mt-10">
                <span>Don't have an account ?</span>
                <Link to="/register" className="hover:text-accent-yellow"> Sign Up</Link>
            </div>
        </section>
    )
}