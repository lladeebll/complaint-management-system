import {React, useState} from 'react';
import { useForm } from '../customHooks/UseForm';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';


const AddComplaint = () => {

    const [values,  handleChange]   =   useForm({
        title:"",
        department:"",
        description:""
    })
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        values.title="";
        values.department="";
        values.description="";
    }
    const handleShow = () => setShow(true);

    const onSubmit   =   (e)  =>
    {
        e.preventDefault();
        setShow(false);
        console.log(values);
    }
    return (
        <>
        <div className="d-flex mt-3 justify-content-end">
        <Button variant="primary" onClick={handleShow} className="mr-0 w-">
        Add Complaint
        </Button>
        </div>
        <Modal show={show} onHide={handleClose} centered>
            <Form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                <Modal.Title>Add Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel label="Department">
                        <Form.Select className="mb-3" name="department" value={values.department} onChange={handleChange}>
                        <option value="1">Sample1</option>
                        <option value="2">Sample2</option>
                        </Form.Select>
                    </FloatingLabel>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Title">
                        <Form.Control type="text" onChange={handleChange} name="title" value={values.title}  placeholder="Title" />
                        </FloatingLabel>
                    </Form.Group>
                    <FloatingLabel label="Description">
                        <Form.Control as="textarea" name="description" value={values.description} onChange={handleChange} placeholder="Description"style={{ height: '100px' }}/>
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