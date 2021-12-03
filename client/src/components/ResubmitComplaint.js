import {React, useState} from 'react';
import { useForm } from '../customHooks/UseForm';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';
import  {useNavigate} from  "react-router-dom";
import  {   useEffect} from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';


const ResubmitComplaint = (props) => {

    const navigate  =   useNavigate()

    function routeHome() {
        // logoutFunct();
        navigate("../home", { replace: true });
      }
    
    useEffect(() => {
        setShow(props.resubmit);
    }, [props.resubmit])

    const [values,  handleChange]   =   useForm({
        comment:""
    })
    const [show,setShow] = useState(props.resubmit);
    const [resubmit, setResubmit] = useState(false);

    const handleClose = () => {
        setResubmit(false);
        props.submitRating();
    }

    const onSubmit   =  async   (e)  =>
    {
        e.preventDefault();
        console.log(values);
        let obj={
            complaint_id:props.complaint.id,
            comment:values.comment
        }
        let res =   await   postResubmit('/api/student/resubmitcomplaint',obj)
        console.log(res);
        if(res!==null)
        {
            routeHome();
        }
    }
    async function postResubmit(url, data) {
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
            props.routeLogin()
            return null;
        }
        return response.json(); // parses JSON response into native JavaScript objects
    }
    return (
        <>
        <Modal show={show} onHide={handleClose} centered>
            <Form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                <Modal.Title>Re-Submit Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!resubmit&&<div>Your rating seems to be too low. Do you want to re-submit the complaint?</div>}
                    {resubmit&&
                    <FloatingLabel label="Comment">
                        <Form.Control as="textarea" name="comment" value={values.comment} onChange={handleChange} placeholder="Comment"style={{ height: '100px' }}/>
                    </FloatingLabel>}
                    
                </Modal.Body>
                <Modal.Footer>
                {!resubmit&&
                <div>
                    <Button variant="primary" className="mx-1" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" className="mx-1" onClick={()=>{setResubmit(true)}}>
                        Yes
                    </Button>
                </div>
                }
                {resubmit&&
                <div>
                    <Button variant="primary" className="mx-1" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" className="mx-1" onClick={onSubmit}>
                        ReSubmit
                    </Button>
                </div>
                }
                
                
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}


export default ResubmitComplaint;