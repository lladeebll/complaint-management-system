import {useEffect, useState} from 'react';
import { useForm } from '../customHooks/UseForm';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router';



const DeleteComplaint = (props) => {
    const navigate  =   useNavigate()
    function routeLogin() {
        props.logoutFunct();
        navigate("../../", { replace: true });
      }
    function routeHome() {
        navigate("../", { replace: true });
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        // values.title=props.complaint.title;
        // values.department=props.complaint.department;
    }
    const handleShow = () => setShow(true);

    // const [departments, setDepartments] = useState([])

    const deleteFunct=  async   (id)=>{
        console.log(id);
        let res =   await   postDelete('http://localhost:5001/api/student/deletecomplaint',{id:id});
        setShow(false);
        console.log(res);
        if(res.message!=='Complaint deleted successfully')
        {
            routeHome();
        }
        else
        {
            routeLogin();
        }
    }
    async function postDelete(url, data) {
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
        <Button variant="danger" onClick={handleShow} className="m-3 px-2">
        Delete
        </Button>
        <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>Delete Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this complaint?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={()=>deleteFunct(props.complaint.id)}>
                    Delete
                </Button>
                </Modal.Footer>

        </Modal>
        </>
    )
}


export default DeleteComplaint;