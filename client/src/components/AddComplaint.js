import {React, useState} from 'react';
import { useForm } from '../customHooks/UseForm';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';
import  {   useEffect} from 'react';


const AddComplaint = ({initialCall,departments,routeLogin}) => {

    async function postComplaint(url="/api/student/addcomplaint",data) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`

            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        if(response.status!==200)
        {
            routeLogin();
            return null;
        }
        return response.json(); // parses JSON response into native JavaScript objects
      }
    useEffect(() => {
        console.log(departments);
        
    }, [departments])
    const [values,  handleChange]   =   useForm({
        title:"",
        depId:"",
        description:""
    })
    const [errors,setErrors] = useState({
        department:"",
        title:"",
        description:""
    })
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setErrors({
            department:"",
            title:"",
            description:""
        });
    }
    const handleShow = () => setShow(true);

    const onSubmit   =   async  (e)  =>
    {
	    e.preventDefault();
        let departmentError="",titleError ="",descriptionError ="";

        if(values.depId==='' || values.title==='' || values.description===''){
            if(values.depId==='')
                departmentError="Please select any department";
            if(values.title==='')
                titleError="This field is required";
            if(values.description==='')
                descriptionError="This field is required";

            setErrors({
                department:departmentError,
                title:titleError,
                description:descriptionError
            });
            return;

        }

        else{
            
            // console.log(values);
            let res =   await   postComplaint("/api/student/addcomplaint",values);
            console.log(res);
            setShow(false);
            if(res!==null)
            {
    
                initialCall();
            }
        }
        
    }
    return (
        <>
        <div className="d-flex mt-3 justify-content-end">
        <Button variant="primary" onClick={handleShow} className="mr-0 w-">
        Add Complaint
        </Button>
        </div>
        <Modal show={show} onHide={handleClose} centered size="xl">
            <Form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                <Modal.Title>Add Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel label="Department" className="mb-3">
                        <Form.Select name="depId" value={values.depId} onChange={handleChange} isInvalid={!!errors.department}>
                        {/* <option value="1">Sample1</option>
                        <option value="2">Sample2</option> */}
                        <option value="">Select Department</option>
                        {departments.map((department)=>(
                            <option key={department[0]} value={department[0]}>{department[1]}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                        {errors.department}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Title">
                        <Form.Control type="text" onChange={handleChange} name="title" value={values.title}  placeholder="Title" isInvalid={!!errors.title}/>
                        <Form.Control.Feedback type="invalid">
                        {errors.title}
                        </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <FloatingLabel label="Description">
                        <Form.Control as="textarea" name="description" value={values.description} onChange={handleChange} placeholder="Description"style={{ height: '200px' }} isInvalid={!!errors.description}/>
                        <Form.Control.Feedback type="invalid">
                        {errors.description}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit">
                    Add
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}


export default AddComplaint;
