import { InputForm } from "../../components/elements/InputForm"
import { ButtonBtn } from "../../components/elements/Buttons"
import { ErrorAlert } from "../../components/elements/ErrorAlert"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function RegisterPage() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [formData, setFormData] = useState({
        name: '', 
        email: '', 
        password: '', 
        password_confirmation: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigateTo = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // send data to the API
        const postRegister = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/register`, {
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

        postRegister();
    }
    
    return (
        <section className="py-28">
            <h1 className="text-2.5xl text-center font-bold uppercase tracking-wider">Register New User</h1>
            <ErrorAlert message={error}/>
            
            <form onSubmit={handleSubmit} id="registerForm" className="flex flex-col gap-5 w-9/12 max-w-sm mx-auto mt-10 text-lg">
                <InputForm
                    label="Name"
                    name="name" 
                    placeholder="Your Name"
                    onChange={e => setFormData((prev) => ({...prev, name: e.target.value}))}
                />
                <InputForm
                    label="Email"
                    name="email" 
                    placeholder="your_email@mail.com"
                    type="email"
                    onChange={e => setFormData((prev) => ({...prev, email: e.target.value}))}
                />
                <InputForm
                    label="Password"
                    name="password" 
                    placeholder="must be at least 8 characters"
                    type="password"
                    onChange={e => setFormData((prev) => ({...prev, password: e.target.value}))}
                />
                <InputForm
                    label="Password Confirmation"
                    name="password_confirmation"
                    type="password"
                    onChange={e => setFormData((prev) => ({...prev, password_confirmation: e.target.value}))}
                />

                <ButtonBtn className="mt-8" disabled={isLoading}>{!isLoading ? 'Sign Up' : 'Loading...'}</ButtonBtn>
            </form>
        </section>
    )
}