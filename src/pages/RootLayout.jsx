import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Homepage } from "./Home/Homepage";
import { Outlet } from "react-router";
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

export function RootLayout() {
  const {loggedInUser, setLoggedInUser} = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="relative min-h-screen bg-primary-dark text-primary-dark text-white">
          <h3 className='inline-block pr-5'>Hi, {loggedInUser?.name}</h3>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}