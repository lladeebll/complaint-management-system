import {React, useState} from 'react';
import EditComplaint from "../components/EditComplaint";
import RatingComponent from "../components/RatingComponent";
import Complaints from '../constants/complaints.json';


const ComplaintPage = (props) => {

    const [id] = useState(0);

    return (
        <>
            <h2 className="pl-0 mt-4">{Complaints[id].title}</h2>
            {Complaints[id].description}
            <EditComplaint complaint={Complaints[id]}/>
            <RatingComponent/>
        </>

    )
}

export default ComplaintPage;