import { InputForm } from "../../components/elements/InputForm";
import { ButtonPrimary } from "../../components/elements/Buttons";
import { ErrorAlert } from "../../components/elements/ErrorAlert";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export function LoginPage() {
    const [formData, setFormData] = useState({email : '', password : ''});
    const {postLogin, error, isLoading} = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        
        postLogin(formData);
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

                <ButtonPrimary className="mt-8" disabled={isLoading}>{!isLoading ? 'Login' : 'Loading...' }</ButtonPrimary>
            </form>

            <div className="text-center mt-10">
                <span>Don't have an account ?</span>
                <Link to="/register" className="hover:text-accent-yellow"> Sign Up</Link>
            </div>
        </section>
    )
}