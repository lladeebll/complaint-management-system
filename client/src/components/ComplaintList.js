import {Link} from 'react-router-dom';
import React from 'react';
import Complaints from '../constants/complaints.json';
import ListItem from "./ListItem";
import { useEffect } from 'react';
import {Button} from 'react-bootstrap'
import '../styles/ComplaintList.css'



const ComplaintList = ({list}) => {

    const deleteFunct=  async   (id)=>{
        console.log(id);
        let res =   await   postDelete('http://localhost:5001/api/student/deletecomplaint',{id:id})
        console.log(res);
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
        console.log(list);
    }, [list])
    return (
        <>
                {
                    list.complaints?.map((complaint)=>{
                        return (
                            <div className="container">
                                <div className="row flex-box">
                                    <Link className="col-8" to={`/home/complaint?id=${complaint['complaint ID: ']}`} className="text-decoration-none">
                                        <ListItem className="col-8" key={complaint['complaint ID: ']} complaint={complaint} />
                                    </Link>
                                    <Button className="col-2" variant="danger" onClick={()=>deleteFunct(complaint['complaint ID: '])}>Hello</Button>
                                </div>
                            </div>

                        )
                    })
                }
        </>
    )
}


export default ComplaintList;