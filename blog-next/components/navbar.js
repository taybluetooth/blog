import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Hamburger from 'hamburger-react'

const Navbar = () => {

    const [color, setColor] = useState(false);

    const changeNavbarColor = () => {
        if(window.scrollY >= 400) {
            setColor(true)
        }
        else {
            setColor(false)
        }
    }
    React.useEffect(() => {
        window.addEventListener('scroll', changeNavbarColor);
    })

    return (
        <div className={color ? 'navbar colorChange' : 'navbar'}>
            <div className='navbar-content'>
                <div className='navbar-content-left'>
                    <img className='icon' src='computer-icon.png'></img>
                    <Link href='/'>Callum Taylor</Link>
                </div>
                <div className='navbar-content-right'>
                    <Link href='/'>Home</Link>
                    <a>About</a>
                    <a>Projects</a>
                    <a>Contact</a>
                </div>
                <div className="navbar-toggle">
                    <Hamburger/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;