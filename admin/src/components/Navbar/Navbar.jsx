import React from 'react'
import "./Navbar.css"
import { assets } from "../../assets/assets"

const Navbar = () => {
    return (
        <div className='navbar'>
            {/* <img className='logo' src={assets.logo} alt="" /> */}
            <h1 className='logo'>Food here</h1>
            <img className='profile' src={assets.profile_image} alt="" />
        </div>
    )
}

export default Navbar
