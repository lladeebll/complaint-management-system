import {React, useState} from 'react';
import EditComplaint from "../components/EditComplaint";
import RatingComponent from "../components/RatingComponent";
import Complaints from '../constants/complaints.json';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

const ComplaintPage = (props) => {

    initFunct=async () => {
        let id1=location.search.split('=')[1];
        setId(id1)
        console.log(id);
    }
    const [id,setId] = useState(0);
    const location = useLocation();
    useEffect(()=>{

    }, [])

    return (
        <>
            {/* <h2 className="pl-0 mt-4">{Complaints[id].title}</h2>
            {Complaints[id].description}
            <EditComplaint complaint={Complaints[id]}/>
            <RatingComponent/> */}
        </>

    )
}

export default ComplaintPage;