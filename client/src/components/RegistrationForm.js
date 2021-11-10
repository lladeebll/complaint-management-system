import React from 'react'
import { useForm } from '../customHooks/UseForm'


const RegistrationForm = () => {

    const [values,  handleChange]   =   useForm({
        name:"",
        userId:"",
        password:"",
        repeatPassword:"",
        phone:"",
        email:"",
        department:"",
        role:"student"
    })
    const print   =   (e)  =>
    {
        e.preventDefault()
        console.log(values);
    }
    return (
        <div className="container">
            <form onSubmit={print()}>
                <div className="input">
                    <div className="label">
                        <label htmlFor="name">Name: &nbsp;</label>
                    </div>
                    <div>
                        <input name="name" onChange={handleChange} id="name" type="text"  required/>
                    </div>
                </div>

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

                <div className="input">
                    <div className="label">
                        <label htmlFor="repeatPassword">Repeat Password: &nbsp;</label>
                    </div>
                    <div>
                        <input name="repeatPassword" onChange={handleChange} value={values.repeatPassword} id="repeatPassword" type="password"  required/>
                    </div>
                </div>

                <div className="input">
                    <div className="label">
                        <label htmlFor="phone">Phone: &nbsp;</label>
                    </div>
                    <div>
                        <input name="phone" onChange={handleChange} value={values.phone} id="phone" type="text"  required/>
                    </div>
                </div>

                <div className="input">
                    <div className="label">
                        <label htmlFor="email">Email: &nbsp;</label>
                    </div>
                    <div>
                        <input name="email" onChange={handleChange} value={values.email} id="email" type="email"  required/>
                    </div>
                </div>

                <div className="input">
                    <div className="label">
                        <label htmlFor="department">Department: &nbsp;</label>
                    </div>
                    <div>
                        <input name="department" onChange={handleChange} value={values.department} id="department" type="text"  required/>
                    </div>
                </div>
                
                <div className="input">
                    <div className="label">
                        <label htmlFor="role">Select Role: &nbsp;</label>
                    </div>
                    <div>
                        <select name="role" onChange={handleChange} value={values.role} id="role" required>
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                        </select>
                    </div>
                </div>
                <input type="submit" value="register" />
            </form>
        </div>
    )
}


export default RegistrationForm
