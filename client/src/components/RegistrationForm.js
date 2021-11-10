import React from 'react'
import { useForm } from '../customHooks/UseForm';
import { Form, Button } from 'react-bootstrap';


const RegistrationForm = () => {

    const [values,  handleChange]   =   useForm({
        name:"",
        deptId:"",
        userName:"",
        password:"",
        repeatPassword:"",
        phno:"",
        email:"",
        actor:"student"
    })
    const onSubmit   =   (e)  =>
    {
        e.preventDefault()
        console.log(values);
    }
    return (
        <Form onSubmit={onSubmit} className="w-25 m-auto mt-5">
            <Form.Select className="mb-3" name="actor" value={values.actor} onChange={handleChange} >
                <option value="student">Student</option>
                <option value="department">Department</option>
            </Form.Select>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="name" value={values.name}  placeholder="Name" />
            </Form.Group>
            <Form.Group className={`mb-3 ${values.actor==="student"?"":"d-none"}`}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="userName" value={values.userName} placeholder="Username" />
            </Form.Group>
            <Form.Group className={`mb-3 ${values.actor==="student"?"d-none":""}`}>
                <Form.Label>Department ID</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="deptId" value={values.deptId} placeholder="Department ID" />
            </Form.Group>
            <Form.Group className={`mb-3 ${values.actor==="student"?"":"d-none"}`}>
                <Form.Label>Phone no</Form.Label>
                <Form.Control type="number" onChange={handleChange} name="phno" value={values.phno} placeholder="Phone no" />
            </Form.Group>
            <Form.Group className={`mb-3 ${values.actor==="student"?"":"d-none"}`}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={handleChange} name="email" value={values.email} placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={handleChange} name="password" value={values.password}  placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" onChange={handleChange} name="repeatPassword" value={values.repeatPassword}  placeholder="Confirm Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}


export default RegistrationForm
