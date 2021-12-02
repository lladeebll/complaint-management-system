import {useEffect, useState} from 'react';
import { useForm } from '../customHooks/UseForm';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router';



const EditComplaint = (props) => {
    const navigate  =   useNavigate()
    function routeLogin() {
        props.logoutFunct();
        navigate("../../", { replace: true });
      }
    const [values,  handleChange]   =   useForm({
        // title:props.complaint.title,
        // department:props.complaint.depId,
        description:props.complaint.description
    })
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        // values.title=props.complaint.title;
        // values.department=props.complaint.department;
        values.description=props.complaint.description;
    }
    const handleShow = () => setShow(true);

    // const [departments, setDepartments] = useState([])

    const onSubmit   =  async   (e)  =>
    {
        e.preventDefault();
        setShow(false);
        console.log(values);
        let obj={
            complaint_id:props.complaint.id,
            description:values.description
        }
        let res =   await   postEdit('http://localhost:5001/api/student/editcomplaint',obj)
        console.log(res);
        if(res!==null)
        {
            props.logID();
        }
    }
    async function postEdit(url, data) {
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
            routeLogin()
            return null;
        }
        return response.json(); // parses JSON response into native JavaScript objects
      }

    useEffect(() => {
        if(!localStorage.getItem('accessToken'))
        {
            routeLogin()
            return
        }

    }, [])

    return (
        <>
        <Button variant="primary" onClick={handleShow} className="m-3 px-3">
        Edit
        </Button>
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <FloatingLabel label="Department">
                        <Form.Select className="mb-3" name="department" value={values.department} onChange={handleChange}> */}
                        {/* <option value="1">Sample1</option>
                        <option value="2">Sample2</option> */}
                        {/* <option value="">--Select Department--</option>
                        {departments.map((department)=>{
                            return  <option key={department[0]} value={department[0]}>{department[1]}</option>
                        })} */}
                        
                        {/* </Form.Select>
                    </FloatingLabel> */}
                    {/* <Form.Group className="mb-3">
                        <FloatingLabel label="Title">
                        <Form.Control type="text" onChange={handleChange} name="title" value={values.title}  placeholder="Title" />
                        </FloatingLabel>
                    </Form.Group> */}
                    <FloatingLabel label="Description">
                        <Form.Control as="textarea" name="description" value={values.description} onChange={handleChange} placeholder="Description"style={{ height: '100px' }}/>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit">
                    Save
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}


export default EditComplaint;