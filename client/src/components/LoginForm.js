import { useForm } from "../customHooks/UseForm"
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router";

const LoginForm = () => {
    const navigate=useNavigate()
    const baseAddress='http://localhost:5001/login'

    const [values,  handleChange]   =   useForm({
        userName:"",
        password:"",
        actor:"student"
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
            alert("Please fill appropriately")
            return
        }
        console.log(values);
        postData(baseAddress,values).then(x=>{
                if(x.variant==='success')
                {
                    // accessToken=x.accessToken;
                    localStorage.setItem('accessToken',x.accessToken);
                    routeHome();
                }
                else
                {
                    alert("Password and the username doesn't match");
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
                    <Form.Control type="text" onChange={handleChange} name="userName" value={values.userName} placeholder="Username" />
                </Form.Group>
                {/* <Form.Group className={`mb-3 ${values.actor==="student"?"d-none":""}`}>
                    <Form.Label>Department ID</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="deptId" value={values.deptId} placeholder="Department ID" />
                </Form.Group> */}
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handleChange} name="password" value={values.password}  placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
    )
}

export default LoginForm;
