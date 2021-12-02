import { useForm } from "../customHooks/UseForm"
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { useState } from "react";

const LoginForm = ({loginFunct,setActor}) => {
    const navigate=useNavigate()
    const baseAddress='http://localhost:5001/login'

    const [values,  handleChange]   =   useForm({
        userName:"",
        password:"",
        actor:"student"
    })

    const [errors,setErrors] = useState({
        username:"",
        password:"",
        final:""
    })

    function routeHome() {
        navigate("../home/", { replace: true });
      }

      async function postData(url, data) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }


    const onSubmit  = (e)    =>  {
        e.preventDefault()
        if(values.userName===''||values.password==='')
        {

            let usernameError="",passwordError ="";

            if(values.userName==='')
                usernameError="This field is required";
            if(values.password==='')
                passwordError="This field is required";

            
            setErrors({
                username:usernameError,
                password:passwordError
            });
            return;
        }
        console.log(values);
        postData(baseAddress,values).then(x=>{
                if(x.variant==='success')
                {
                    // accessToken=x.accessToken;
                    console.log(x);

                    localStorage.setItem('accessToken',x.accessToken);
                    localStorage.setItem('actor',values.actor);
                    setActor(values.actor);
                    loginFunct();
                    routeHome();
                }
                else
                {
                    setErrors({
                        final:"* Username or password is incorrect"
                    });
                }

            })
        

    }
    return (
            <Form onSubmit={onSubmit} className="w-25 m-auto mt-5">
                <Form.Select className="mb-3" name="actor" value={values.actor} onChange={handleChange} >
                    <option value="student">Student</option>
                    <option value="department">Department</option>
                </Form.Select>
                <Form.Group className={`mb-3`}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="userName" value={values.userName} placeholder="Username" isInvalid={!!errors.username}/>
                    <Form.Control.Feedback type="invalid">
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group className={`mb-3 ${values.actor==="student"?"d-none":""}`}>
                    <Form.Label>Department ID</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="deptId" value={values.deptId} placeholder="Department ID" />
                </Form.Group> */}
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handleChange} name="password" value={values.password}  placeholder="Password" isInvalid={!!errors.password}/>
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="position-absolute">
                    <Form.Control className="d-none" isInvalid={!!errors.final}/>
                    <Form.Control.Feedback type="invalid">
                        {errors.final}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4">
                    Submit
                </Button>
            </Form>
    )
}

export default LoginForm;
