import { Outlet } from "react-router";
import Navbar from './Navbar';

import './style.css';

const SharedLayout = () => {

    return (
        <>
            <div className="container-sh">
                <Navbar />
                <main>
                    <Outlet />
                </main>
                <footer className="footer">
                    <p>All Rights Reserved 2023</p>
                </footer>
            </div>
        </>
    );
};

export default SharedLayout;