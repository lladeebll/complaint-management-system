import React from 'react';
import '../styles/ListItem.css'
import { Button } from 'react-bootstrap'; 

const ListItem = ({complaint,deleteFunct}) => {

    return (
        <div className="complaint-item p-3 mt-3 col-9">
           <div className="complaint-title">{complaint['title: ']}</div>
           <div className={"complaint-details mt-1 "+complaint['status: ']}>
           <div className="complaint-status"><div className="status-icon"></div><div className="status-text"></div></div>
           </div>
           <Button variant="danger" onClick={()=>{deleteFunct(complaint['complaint ID'])}} className="right-align">Delete</Button>
       </div>
    )
}


export default ListItem;