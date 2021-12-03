import {useEffect, useState} from 'react';
import { useForm } from '../customHooks/UseForm';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router';


const EditStatusComponent = ({complaint,logoutFunct,logID}) => {
    const navigate  =   useNavigate()
    const [status, setStatus] = useState([[]])
    function routeLogin() {
        logoutFunct();
        navigate("../../", { replace: true });
      }
      const [values,  handleChange]   =   useForm({
        // title:complaint.title,
        // department:complaint.depId,
        status:complaint.status
    })
    const handleClose = () => {
        setShow(false);
        // values.title=complaint.title;
        // values.department=complaint.department;
        values.status=complaint.status;
    }
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const onSubmit   =  async   (e)  =>
    {
        e.preventDefault();
        setShow(false);
        // console.log(values);
        let obj={
            complaint_id:complaint.id,
            status:values.status
        }
        let res =   await   postEditStatus('/api/department/editstatus',obj)
        console.log(res);
        if(res!==null)
        {
            logID();
        }
    }

    async function postEditStatus(url, data) {
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

      async function getStatus(url="/api/department/editstatus") {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`

            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        //   body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        if(response.status!==200)
        {
            routeLogin();
        }
        return response.json(); // parses JSON response into native JavaScript objects
      }

      const initFunct =   async   ()  =>  {
            let res   =   await   getStatus();
            setStatus(res);
            // console.log(res);

      }

    useEffect(() => {
        if(!localStorage.getItem('accessToken'))
        {
            routeLogin()
            return
        }
        else
        {
            initFunct()
        }

    }, [])

    return (
        <>
        <Button variant="primary" onClick={handleShow} className="mr-0 mt-3">
        Edit Status
        </Button>
        <Modal show={show} onHide={handleClose} centered>
            <Form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel label="Status">
                        <Form.Select className="mb-3" name="status" value={values.status} onChange={handleChange}>
                        <option value="">--Select Status--</option>
                        {status.map((status)=>{
                            return  <option key={status[0]} value={status[0]}>{status[0]}</option>
                        })}
                        </Form.Select>
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

export default EditStatusComponent
