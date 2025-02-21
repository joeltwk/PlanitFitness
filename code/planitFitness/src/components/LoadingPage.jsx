import PlanitLogo from '../assets/PlanitLogo.png'


function LoadingPage ({}) {
    return (
        <div className="loadingLogo">
            <div className="loadingContainer">
                <img className="loadingLogoImg" src={PlanitLogo} alt="logo-image" />
                <br></br>
                <div className="loadingGifContainer">
                   <img className="loadingGif" src="./Ripple@1x-1.0s-200px-200px.svg"/>
                </div>
            </div>
        </div>
    )
}

export default LoadingPage;