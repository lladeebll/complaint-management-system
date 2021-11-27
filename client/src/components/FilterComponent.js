import React from 'react';
import { Form } from 'react-bootstrap';



const FilterComponent = (props) => {

    return (
        <Form className="align-self-center my-2">
            <div>
            <Form.Check className="mx-2" inline label="Rectified" name="status" type="checkbox" id="checkbox1" defaultChecked onChange={props.statusChange}/>
            <Form.Check className="mx-2" inline label="Rejected" name="status" type="checkbox" id="checkbox2" defaultChecked  onChange={props.statusChange}/>
            <Form.Check className="mx-2" inline label="Pending" name="status" type="checkbox" id="checkbox3" defaultChecked  onChange={props.statusChange}/>
            </div>
        </Form>   
           
    );  
}


export default FilterComponent;