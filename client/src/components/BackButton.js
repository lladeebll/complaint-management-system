import { useNavigate } from 'react-router';
import '../styles/BackButton.css'



const BackButton = () => {
    const navigate  =   useNavigate()

    function routeHome() {
        navigate("../home", { replace: true });
    }

    
    return (
        <div class="back-button" onClick={routeHome}>
        <div class="arrow-wrap">
            <span class="arrow-part-1"></span>
            <span class="arrow-part-2"></span>
            <span class="arrow-part-3"></span>
        </div>
        </div>
    )
}


export default BackButton;