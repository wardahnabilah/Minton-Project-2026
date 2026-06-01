import { InputForm } from "../../components/elements/InputForm"
import { ButtonBtn } from "../../components/elements/Buttons"
import { useState } from "react"
import { Link } from "react-router-dom";

export function LoginPage() {
    const [isFormFilled, setIsFormFilled] = useState(false);

    return (
        <section className="py-28">
            <h1 className="text-2.5xl text-center font-bold uppercase tracking-wider">Login</h1>
            
            <form id="registerForm" className="flex flex-col gap-5 w-9/12 max-w-sm mx-auto mt-10 text-lg">
                <InputForm
                    label="Email"
                    name="userEmail" 
                    placeholder="your_email@mail.com"
                />
                <InputForm
                    label="Password"
                    name="password" 
                    placeholder="must be at least 8 characters"
                    type="password"
                />

                <ButtonBtn className="mt-8" disabled={!isFormFilled}>Login</ButtonBtn>
            </form>

            <div className="text-center mt-10">
                <span>Don't have an account ?</span>
                <Link to="/register" className="hover:text-accent-yellow"> Sign Up</Link>
            </div>
        </section>
    )
}