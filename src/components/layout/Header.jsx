import mintonLogo from '../../assets/images/minton-logo.png'
import { NavItem } from './NavItem'
import { NavLink, Link } from 'react-router-dom'
import { ButtonLinkSmall } from '../elements/Buttons'

export function Header() {
    const navList = (
        <ul className="md:flex text-white">
            <NavItem>
                <NavLink to="/" className="block">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/booking-schedule" className="block">Booking Schedule</NavLink>
            </NavItem>
            <NavItem>
                <ButtonLinkSmall pathName="/login">Login</ButtonLinkSmall>
            </NavItem>
        </ul>
    )
    
    return (
        <header className="py-4 fixed inset-x-0 top-0 z-50  bg-header-dark text-primary-dark text-white">
            <div className="w-11/12 mx-auto flex justify-between items-center">
                <Link to="/">
                    <img className="w-28 hover:cursor-pointer" src={mintonLogo} alt="Minton Logo" />
                </Link>
                <div className="md:block">
                    {navList}
                </div>
            </div>
        </header>
    )
}