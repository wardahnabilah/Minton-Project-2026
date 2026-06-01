import { InputForm } from "../../components/elements/InputForm"
import { ButtonBtn } from "../../components/elements/Buttons"
import { useState } from "react"

export function RegisterPage() {
    const [isFormFilled, setIsFormFilled] = useState(false);
    
    return (
        <section className="py-28">
            <h1 className="text-2.5xl text-center font-bold uppercase tracking-wider">Register New User</h1>
            
            <form id="registerForm" className="flex flex-col gap-5 w-9/12 max-w-sm mx-auto mt-10 text-lg">
                <InputForm
                    label="Name"
                    name="userName" 
                    placeholder="Your Name"
                />
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
                <InputForm
                    label="Password Confirmation"
                    name="password_confirmation"
                    type="password"
                />


                <ButtonBtn className="mt-8" disabled={!isFormFilled}>Sign Up</ButtonBtn>
            </form>
        </section>
    )
}