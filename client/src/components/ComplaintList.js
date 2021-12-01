import {Link} from 'react-router-dom';
import React from 'react';
import Complaints from '../constants/complaints.json';
import ListItem from "./ListItem";
import { useEffect } from 'react';


const ComplaintList = ({list}) => {

    useEffect(() => {
        console.log(list);
    }, [])
    return (
        <>
                {
                    Complaints.map((complaint)=>{
                        return (
                            <Link to={`/home/complaint?id=${complaint.id}`} className="text-decoration-none">
                                <ListItem complaint={complaint} />
                            </Link>
                            

                        )
                    })
                }
        </>
    )
}


export default ComplaintList;