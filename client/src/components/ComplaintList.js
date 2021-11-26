import React from 'react';
import Complaints from '../constants/complaints.json';
import { Table } from 'react-bootstrap';
import ListItem from "./ListItem";


const ComplaintList = () => {

    return (
        <>
        <Table striped bordered hover>
            <tbody>
                {
                    Complaints.map((complaint)=>{
                        return (

                            <ListItem complaint={complaint} />

                        )
                    })
                }
                
            </tbody>
            </Table>
        </>
    )
}


export default ComplaintList;