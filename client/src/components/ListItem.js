import React from 'react';


const ListItem = (props) => {

    return (
        <tr>
        <td>{props.complaint.id}</td>
        <td>{props.complaint.title}</td>
        <td>{props.complaint.description}</td>
        </tr>
    )
}


export default ListItem;