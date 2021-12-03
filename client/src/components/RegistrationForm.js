import React from 'react'
import { useForm } from '../customHooks/UseForm';
import { Form, Button } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';
import { useState } from "react";


const RegistrationForm = ({loginFunct,setActor}) => {
    let navigate = useNavigate();

    const baseAddress='/register'

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

    const [errors,setErrors] = useState({
        name:"",
        username:"",
        password:"",
        repeatpassword:"",
        phno:"",
        email:"",
        final:""
    })

    function ValidateEmail(inputEmail)
    {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputEmail.match(mailformat))
        return true;

    return false;
    }

    // const accessToken='';
    const onSubmit   =   (e)  =>
    {
        console.log(values);
        e.preventDefault()
        // let n=values.password.length
        // console.log(n);
        let usernameError="",passwordError ="",nameError="",phnoError="",emailError="",repeatPasswordError="";

        if(values.actor==='student')
        {
            

            if(values.phno==="")
                phnoError="This field is required";
            else if(values.phno.length!==10)
                phnoError="Enter a valid phone number";

            if(values.email==="")
                emailError="This field is required";
            else if(!ValidateEmail(values.email))
                emailError="Enter a valid email";  

        }
        if(values.userName==="")
            usernameError="This field is required";
        else if(values.userName.length<5)
            usernameError="Minimum 5 characters required";

        if(values.name==="")
            nameError="This field is required";

        if(values.password==="")
            passwordError="This field is required";
        if(values.repeatPassword==="")
            repeatPasswordError="This field is required";
        if(values.password!==""&&values.repeatPassword!==""){
            if(values.password!==values.repeatPassword)
                repeatPasswordError="Passwords do not match";
            else if(values.password.length<8)
                passwordError="Minimum 8 characters required";
        }

        setErrors({
            name:nameError,
            username:usernameError,
            password:passwordError,
            repeatpassword:repeatPasswordError,
            phno:phnoError,
            email:emailError
        });

        
        if(usernameError===""&&passwordError ===""&&nameError===""&&phnoError===""&&emailError===""&&repeatPasswordError===""){
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
                    setErrors({
                        final:"* Username already exists"
                    });
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
                <Form.Control type="text" onChange={handleChange} name="name" value={values.name}  placeholder="Name"  isInvalid={!!errors.name}/>
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={`mb-3 `}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="userName" value={values.userName} placeholder="Username"  isInvalid={!!errors.username}/>
                <Form.Control.Feedback type="invalid">
                    {errors.username}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={`mb-3 ${values.actor==="student"?"":"d-none"}`}>
                <Form.Label>Phone no</Form.Label>
                <Form.Control type="number" onChange={handleChange} name="phno" value={values.phno} placeholder="Phone no"  isInvalid={!!errors.phno}/>
                <Form.Control.Feedback type="invalid">
                    {errors.phno}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={`mb-3 ${values.actor==="student"?"":"d-none"}`}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="email" value={values.email} placeholder="Email"  isInvalid={!!errors.email}/>
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={handleChange} name="password" value={values.password}  placeholder="Password"  isInvalid={!!errors.password}/>
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" onChange={handleChange} name="repeatPassword" value={values.repeatPassword}  placeholder="Confirm Password"  isInvalid={!!errors.repeatpassword}/>
                <Form.Control.Feedback type="invalid">
                    {errors.repeatpassword}
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


export default RegistrationForm
