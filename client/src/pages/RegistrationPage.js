import RegistrationForm from '../components/RegistrationForm'

const RegistrationPage = ({loginFunct,setActor}) => {
    return (
        <div className="d-flex justify-content-center">
            <RegistrationForm   loginFunct={loginFunct} setActor={(actor=>setActor(actor))}></RegistrationForm>
        </div>
    )
}

export default RegistrationPage
