import { useForm } from "../customHooks/UseForm"
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {

    const [values,  handleChange]   =   useForm({
        userName:"",
        deptId:"",
        password:"",
        actor:"student"
    })

    const onSubmit  = (e)    =>  {
        e.preventDefault()
        console.log(values);
    }
    return (
            <Form onSubmit={onSubmit} className="w-25 m-auto mt-5">
                <Form.Select className="mb-3" name="actor" value={values.actor} onChange={handleChange} >
                    <option value="student">Student</option>
                    <option value="department">Department</option>
                </Form.Select>
                <Form.Group className={`mb-3 ${values.actor==="student"?"":"d-none"}`}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="userName" value={values.userName} placeholder="Username" />
                </Form.Group>
                <Form.Group className={`mb-3 ${values.actor==="student"?"d-none":""}`}>
                    <Form.Label>Department ID</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="deptId" value={values.deptId} placeholder="Department ID" />
                </Form.Group>
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
