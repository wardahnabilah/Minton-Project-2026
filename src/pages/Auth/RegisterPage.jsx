import { InputForm } from "../../components/elements/InputForm"
import { ButtonFilled } from "../../components/elements/Buttons"
import { ErrorAlert } from "../../components/elements/ErrorAlert"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '', 
        email: '', 
        password: '', 
        password_confirmation: '',
    });
    const {postRegister, isLoading, error} = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();

        // send data to the API
        postRegister(formData);
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

                <ButtonFilled variant="primary" size="md" className="mt-8" isLoading={isLoading}>Sign Up</ButtonFilled>
            </form>
        </section>
    )
}