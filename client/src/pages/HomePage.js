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
    const [departments, setdepartments] = useState([[]]);
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
            return null;
        }
      }

          async function getDepartments(url="http://localhost:5001/api/student/addcomplaint") {
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
        return response.json(); // parses JSON response into native JavaScript objects
      }
    const initialCall =  async () => {
        if(!localStorage.getItem('accessToken'))
        {
            routeLogin();
            return
        }
        let list1;
        list1 =  await getComplaint();
        setlist(list1);
        if(actor==='student')
        {
          let departments1;
          departments1  = await getDepartments()
          setdepartments(departments1);
        }
    }
    useEffect(()=>{
      initialCall()
    }, [])
    return (
        <>
            <Row className="mt-4">
                <Col sm={8}><SearchComponent/></Col>
                <Col className="d-flex justify-content-end"><FilterComponent/></Col>
            </Row>
            {actor==='student'&&<AddComplaint initialCall={()=>initialCall()} departments={departments} routeLogin={()=>routeLogin()}/>}
            <ComplaintList  actor={actor} list={list}  initialCall={()=>initialCall()} routeLogin={()=>routeLogin()}/>
        </>

    )
}

export default HomePage;