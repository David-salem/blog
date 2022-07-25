import "./Navbar.css";
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div align="center" className="box-nav">
            <div className="navbar">
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/">Home</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="profile">Profile</NavLink>
            </div>
        </div>
    )
}