import { ButtonLink } from "../../components/elements/Buttons";

export function Homepage() {
    return (
        <section className="h-screen bg-[url('./assets/images/bg-hero.png')] bg-cover">
            <div className="absolute top-40 md:top-48 inset-x-0 mx-auto text-center text-white">
                <h1 className="w-8/12 mx-auto leading-normal tracking-wide font-bold text-3xl md:text-4xl uppercase">Unleash Your Badminton Passion</h1>
                <h1 className="mt-5 mb-20 tracking-wide font-bold text-3xl md:text-4xl uppercase">Play, Rally, Soar!</h1>  
                <ButtonLink pathName="/court-schedules">Booking Now</ButtonLink>
            </div>  
        </section>
    )
}