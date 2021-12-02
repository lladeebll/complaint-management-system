import React from 'react';
import { Form } from 'react-bootstrap';



const FilterComponent = (props) => {

    return (
        <Form className="align-self-center my-2">
            <div>
            <Form.Check className="mx-2" inline label="Pending" name="status" type="checkbox" id="checkbox1" value="pending" defaultChecked onChange={props.statusChange}/>
            <Form.Check className="mx-2" inline label="On Process" name="status" type="checkbox" id="checkbox2" value="onProcess" defaultChecked  onChange={props.statusChange}/>
            <Form.Check className="mx-2" inline label="Resolved" name="status" type="checkbox" id="checkbox3" value="resolved" defaultChecked  onChange={props.statusChange}/>
            <Form.Check className="mx-2" inline label="Rejected" name="status" type="checkbox" id="checkbox4" value="rejected" defaultChecked  onChange={props.statusChange}/>
            </div>
        </Form>   
           
    );  
}


export default FilterComponent;