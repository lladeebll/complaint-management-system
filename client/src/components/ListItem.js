import React from 'react';
import '../styles/ListItem.css'

const ListItem = (props) => {

    return (
        <div className="complaint-item p-3 mt-3">
           <div className="complaint-title">{props.complaint.title}</div>
           <div className={"complaint-details mt-1 "+props.complaint.status}>
           <div className="complaint-status"><div className="status-icon"></div><div className="status-text"></div></div>
           </div>
       </div>
    )
}


export default ListItem;