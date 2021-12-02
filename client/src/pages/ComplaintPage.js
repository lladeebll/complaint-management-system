import EditComplaint from "../components/EditComplaint";
import RatingComponent from "../components/RatingComponent";
import Complaints from '../constants/complaints.json';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router";
import EditStatusComponent from "../components/EditStatusComponent";

const ComplaintPage = ({logoutFunct,actor}) => {
    const navigate  =   useNavigate()
    function routeLogin() {
        logoutFunct();
        navigate("../../", { replace: true });
      }
    let initFunct=() => {
        let id1=location.search.split('=')[1];
        setId(id1)
    }
    const [complaint, setComplaint] = useState({})
    let logID=async()=>{
        console.log(id);
        if(id!==0)
        {
           let res  =   await postDescription(actor==='student'?'http://localhost:5001/api/student/getdescriptions':'http://localhost:5001/api/department/getdescriptions',{complaint_id:id})
           console.log(res);
           setComplaint({
               depId:res.depId,
               description:res.description,
               feedback:res.feedback,
               id:res.id,
               stars:res.stars,
               status:res.status,
               title:res.title
           })
        //    console.log(complaint);
        }
    }
    async function postDescription(url, data) {
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
        if(response.status!==200)
        {
            routeLogin()
            return null;
        }
        return response.json(); // parses JSON response into native JavaScript objects
      }
    const [id,setId] = useState(0);
    const location = useLocation();
    useEffect(() => {
        initFunct()
    }, [])
    useEffect(()=>{
        logID()
    }, [id])


    return (
        <>
            <h2 className="pl-0 mt-4">{complaint.title}</h2>
            {complaint.description}
            {actor==='student'&&<EditComplaint complaint={complaint} logoutFunct={()=>logoutFunct()} logID={()=>logID()}/>}
            {actor==='student'&&complaint.status==='rectified'&&<RatingComponent/>}
            {actor==='department'&&<EditStatusComponent complaint={complaint} logoutFunct={()=>logoutFunct()} logID={()=>logID()}/> }
        </>

    )
}

export default ComplaintPage;