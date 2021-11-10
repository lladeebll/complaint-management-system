import { useForm } from "../customHooks/UseForm"
const LoginForm = () => {

    const [values,  handleChange]   =   useForm({
        userId:"",
        password:"",
    })

    const onSubmit  = (e)    =>  {
        e.preventDefault()
        console.log(values);
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit}>

                <div className="input">
                    <div className="label">
                        <label htmlFor="userId">User ID: &nbsp;</label>
                    </div>
                    <div>
                        <input name="userId" onChange={handleChange} value={values.userId} id="userId" type="text"  required/>
                    </div>
                </div>

                <div className="input">
                    <div className="label">
                        <label htmlFor="password">Password: &nbsp;</label>
                    </div>
                    <div>
                        <input name="password" onChange={handleChange} value={values.password} id="password" type="password"  required/>
                    </div>
                </div>
                <input type="submit" value="login" />
            </form>
        </div>
    )
}

export default LoginForm
