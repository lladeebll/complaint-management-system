import EditComplaint from "../components/EditComplaint";
import RatingComponent from "../components/RatingComponent";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router";
import EditStatusComponent from "../components/EditStatusComponent";
import BackButton from "../components/BackButton";
import DeleteComplaint from "../components/DeleteComplaint";
import '../styles/TitleStatus.css'

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
           let res  =   await postDescription(actor==='student'?'/api/student/getdescriptions':'/api/department/getdescriptions',{complaint_id:id})
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
            <BackButton/>
            <div className="w-75 m-auto">
            <h2 className="pl-0 my-4">{complaint.title}<span className={"title-status "+complaint.status}></span></h2>
            <p>
            {complaint.description}
            </p>
            {complaint.feedback&&
            <div className="comment">
                <b>Comments</b>
                <p>{complaint.feedback}</p>
            </div>
            }
            {actor==='student'&&complaint.status==='pending'&&
            <div className="d-flex mt-5 justify-content-end">
                <EditComplaint complaint={complaint} logoutFunct={()=>logoutFunct()} logID={()=>logID()}/>
                <DeleteComplaint complaint={complaint} logoutFunct={()=>logoutFunct()} />
            </div>
            }
            {actor==='student'&&complaint.status==='resolved'&&<div className="d-flex justify-content-around mt-5"><RatingComponent  complaint={complaint} routeLogin={()=>routeLogin()}/></div>}
            {actor==='department'&&
            <div className="d-flex mt-5 justify-content-end">
                <EditStatusComponent complaint={complaint} logoutFunct={()=>logoutFunct()} logID={()=>logID()}/> 
            </div>
            }
            </div>
        </>


    )
}

export default ComplaintPage;