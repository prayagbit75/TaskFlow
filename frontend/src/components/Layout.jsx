import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import { Outlet } from 'react-router-dom'
export default function Layout(){
    return(
         <div className="min-h-screen flex flex-col">

            <Navbar />

            <main className="flex-1 mt-20">

                <Outlet />

            </main>

            <Footer />

        </div>
    )
}

