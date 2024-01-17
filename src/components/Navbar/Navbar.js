import './Navbar.css'

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <a href="/">
                <img src="home.svg" alt="Home" />
            </a>
            <input type="text" name="" id="" className="search" placeholder='Search' />
            <ul>
                <li>
                    <a href="/notifications">
                        <img src="notification.svg" alt="Notifications" />
                    </a>
                </li>
                <li>
                    <a href="/messages">
                        <img src="message.svg" alt="Messages" />
                    </a>
                </li>
                <li>
                    <img src="user.svg" alt="User" />
                </li>
            </ul>
        </nav>
     );
}
 
export default Navbar;