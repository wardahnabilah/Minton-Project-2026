import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Homepage } from "./Home/Homepage";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="relative min-h-screen bg-primary-dark text-primary-dark text-white">
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}