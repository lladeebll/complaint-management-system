import {React, useState} from 'react';
import { useForm } from '../customHooks/UseForm';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';


const EditComplaint = (props) => {

    const [values,  handleChange]   =   useForm({
        title:props.complaint.title,
        department:props.complaint.department,
        description:props.complaint.description
    })
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        values.title=props.complaint.title;
        values.department=props.complaint.department;
        values.description=props.complaint.description;
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
        <Button variant="primary" onClick={handleShow} className="mr-0 mt-3">
        Edit
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
                    Save
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}


export default EditComplaint;