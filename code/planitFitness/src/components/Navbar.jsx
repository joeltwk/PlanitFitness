import PlanitLogo from '../assets/PlanitLogo.png'

function Navbar({username}) {
    return(
        <div className="navbar">
            <div className="logoContainer">
                <img src={PlanitLogo} alt="logo-image" />
            </div>
            <div className="welcomeContainer">
                <h1>Welcome {username}</h1>
            </div>
        </div>
    );
}

export default Navbar