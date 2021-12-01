import LoginForm from "../components/LoginForm";

const LoginPage = ({loginFunct,setActor}) => {
    return (
        <div>
            <LoginForm loginFunct={()=>loginFunct() } setActor={(actor)=>setActor(actor)}></LoginForm>
        </div>

    )
}

export default LoginPage
