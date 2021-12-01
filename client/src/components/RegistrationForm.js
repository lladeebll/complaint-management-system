import React from 'react'
import { useForm } from '../customHooks/UseForm';
import { Form, Button } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';


const RegistrationForm = ({loginFunct,setActor}) => {
    let navigate = useNavigate();

    const baseAddress='http://localhost:5001/register'

    function routeHome() {
        navigate("../home/", { replace: true });
      }
      

    const [values,  handleChange]   =   useForm({
        name:"",
        userName:"",
        password:"",
        repeatPassword:"",
        phno:"",
        email:"",
        actor:"student"
    })
    // const accessToken='';
    const onSubmit   =   (e)  =>
    {
        console.log(values);
        e.preventDefault()
        // let n=values.password.length
        // console.log(n);
        
        if(values.actor==='student')
        {
            if(
                values.userName===""||
                values.name===""||
                values.phno===""||
                values.email===""||
                values.password===""
            )
            {
                alert('Fill the empty fields before submitting');
                return
            }

        }
        else
        {
            if(
                values.userName===""||
                values.name===""||
                values.password===""
            )
            {
                alert('Fill the empty fields before submitting');
                return
            }
        }
        if(values.password!==values.repeatPassword)
        {
            alert("Passwords doesn't match");
            return
        }
        else if(values.password.length<9)
        {
            alert("Set a stronger password")
            return
        }
        else
        {
            let data={};
            console.log(values);
            if(values.actor==='student')
            {
                data={
                    actor:values.actor,
                    userName:values.userName,
                    name:values.name,
                    phno:values.phno,
                    email:values.email,
                    password:values.password
                };
            }
            else
            {
                data={
                    actor:values.actor,
                    userName:values.userName,
                    name:values.name,
                    password:values.password
                }
            }
            
            postData(baseAddress,data).then(x=>{
                if(x.variant==='success')
                {
                    // accessToken=x.accessToken;
                    localStorage.setItem('accessToken',x.accessToken);
                    localStorage.setItem('actor',values.actor);
                    setActor(values.actor);
                    loginFunct();
                    routeHome();
                }
                else
                {
                    alert("couldn't get your user registered");
                }

            })

        }
        // Alert('nlk')
        

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
            <Form.Group className={`mb-3 `}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="userName" value={values.userName} placeholder="Username" />
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
