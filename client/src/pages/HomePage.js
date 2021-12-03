import {Row, Col, OverlayTrigger, Tooltip} from 'react-bootstrap';
import AddComplaint from "../components/AddComplaint";
import ComplaintList from "../components/ComplaintList";
import SearchComponent from "../components/SearchComponent";
import FilterComponent from "../components/FilterComponent";
import ReactStars from "react-rating-stars-component";
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router';

const HomePage = ({logoutFunct,actor}) => {
    const navigate  =   useNavigate()
    const [list, setlist] = useState({
      "complaints":[],
      "avgRating":0
    });
    const [rating,setrating] = useState(false,);
    const [search,setsearch] = useState("",);
    const [filter,setfilter] = useState({
      pending:true,
      onProcess:true,
      resolved:true,
      rejected:true
    },);
    const [filteredlist, setfilteredlist] = useState({
      "complaints":[]
    });
    const [departments, setdepartments] = useState([[]]);
    function routeLogin() {
        logoutFunct();
        // navigate("../", { replace: true });
      }

  async function nameChange(e){
    setsearch(e.target.value);
  }

  async function statusChange(e){
    setfilter(prevstate=>({
      ...prevstate,
      [e.target.value]:e.target.checked
    }));
    
  }

  async function filterComplaints(){
    let complaints1 = list.complaints.filter((complaint)=>{
      return (
               ((search==="")||(complaint['title: '].toLowerCase().startsWith(search.toLowerCase()))) &&
               (filter[complaint['status: ']])
              )
    })
    setfilteredlist(prevstate=>({
      ...prevstate,
      complaints:complaints1
    }));
  }

    async function getComplaint(url=actor==='student'?"http://localhost:5001/api/student/getcomplaints":"http://localhost:5001/api/department/getcomplaints") {
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`

          },
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
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`

          },
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
        setrating(true);
        setfilteredlist(list1);
        if(actor==='student')
        {
          let departments1;
          departments1  = await getDepartments()
          setdepartments(departments1);
        }
    }
    useEffect(()=>{
      initialCall();
    }, [])
    useEffect(()=>{
      filterComplaints();
    }, [search,filter])
    
    return (
        <>
            <Row className="mt-4">
                <Col sm={7}><SearchComponent  nameChange={nameChange} /></Col>
                <Col className="d-flex justify-content-end"><FilterComponent statusChange={statusChange}/></Col>
            </Row>
            {actor==='student'&&<AddComplaint initialCall={()=>initialCall()} departments={departments} routeLogin={()=>routeLogin()}/>}
            {rating&&actor==='department'&&
            <>
              <OverlayTrigger key="1" placement="right" overlay={
                  <Tooltip>
                    {list.avgRating.toFixed(2)}
                  </Tooltip>
                }
              >
              <div className="d-flex justify-content-end">
                <b className="m-2">Rating</b>
                <ReactStars count={5} value={list.avgRating.toFixed(2)} edit={false} isHalf={true} size={24} activeColor="#ffd700" />
              </div>
              </OverlayTrigger>
            </>}
            {(filteredlist.complaints.length&&<ComplaintList  actor={actor} list={filteredlist} />) ||
            <i>No Data found</i>}
            
        </>

    )
}

export default HomePage;