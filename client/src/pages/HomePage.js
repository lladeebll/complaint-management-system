import {Row, Col} from 'react-bootstrap';
import AddComplaint from "../components/AddComplaint";
import ComplaintList from "../components/ComplaintList";
import SearchComponent from "../components/SearchComponent";
import FilterComponent from "../components/FilterComponent";
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router';

const HomePage = ({logoutFunct,actor}) => {
    const navigate  =   useNavigate()
    const [list, setlist] = useState([]);
    function routeLogin() {
        logoutFunct();
        navigate("../", { replace: true });
      }

    async function getComplaint(url=actor==='student'?"http://localhost:5001/api/student/getcomplaints":"http://localhost:5001/api/department/getcomplaints") {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`

            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        //   body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        
        if(response.status===200)
        {
            return response.json(); // parses JSON response into native JavaScript objects
        }
        else
        {
            routeLogin()
            return;
        }
      }

    useEffect(() => {
        if(!localStorage.getItem('accessToken'))
        {
            routeLogin();
            return
        }
        getComplaint().then((x)=>{
            // console.log(x);
            setlist(x.complaints) 
        })
    }, [])
    return (
        <>
            <Row className="mt-4">
                <Col sm={8}><SearchComponent/></Col>
                <Col className="d-flex justify-content-end"><FilterComponent/></Col>
            </Row>
            {actor==='student'&&<AddComplaint/>}
            <ComplaintList list={list}/>
        </>

    )
}

export default HomePage;