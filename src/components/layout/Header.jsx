import mintonLogo from '../../assets/images/minton-logo.png'
import { NavItem } from './NavItem'
import { NavLink, Link } from 'react-router-dom'
import { ButtonLinkSmall, ButtonOutline } from '../elements/Buttons'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export function Header() {
    const {loggedInUser, setLoggedInUser, postLogout} = useContext(AuthContext);
    
    const navList = (
        <ul className="md:flex md:items-center text-white">
            <NavItem>
                <NavLink to="/" className="block">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/court-schedules" className="block">Court Schedules</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/booking-history" className="block">Booking History</NavLink>
            </NavItem>
            {
                (loggedInUser?.role === 'admin') &&
                    <NavItem>
                        <NavLink to="/admin" className="block">Admin</NavLink>
                    </NavItem>
            }
            <NavItem>
                { !loggedInUser ? <ButtonLinkSmall pathName="/login">Login</ButtonLinkSmall> : 
                    <>
                        <ButtonOutline color="primary-red" size="md" onClick={postLogout}>Logout</ButtonOutline>
                    </>
                }
            </NavItem>
        </ul>
    )
    
    return (
        <header className="py-4 fixed inset-x-0 top-0 z-50  bg-header-dark text-primary-dark text-white">
            <div className="w-11/12 mx-auto flex justify-between items-center">
                <Link to="/">
                    <img className="w-28 hover:cursor-pointer" src={mintonLogo} alt="Minton Logo" />
                </Link>
                { loggedInUser && <h3 className='inline-block pl-5'>Hi, {loggedInUser?.name}</h3> }
                <div className="md:block">
                    {navList}
                </div>
            </div>
        </header>
    )
}