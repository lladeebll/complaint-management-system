import {React, useState} from 'react';
import { Button, Card } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import  {useNavigate} from  "react-router-dom";
import ResubmitComplaint from '../components/ResubmitComplaint';


const RatingComponent = ({complaint,routeLogin}) => {
    const navigate  =   useNavigate()
    function routeHome() {
        // logoutFunct();
        navigate("../home", { replace: true });
      }
    const [rating,setRating] = useState(0);
    const [resubmit, setResubmit] = useState(false);

    const ratingChanged = (newRating) => {
        setRating(newRating);
    }

    const submitRating = async() =>{
        console.log(rating);
        let obj={
            id:complaint.id,
            stars:rating
        }
        let res =   await   postRating('http://localhost:5001/api/student/rate',obj);
        console.log(res);
        routeHome();
    }

    const checkRating =    async () => {
        if(rating<=2){
            setResubmit(true);
        }
        else
            submitRating();
        
    }
    async function postRating(url, data) {
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
    return (
        <>
            <Card className="mt-5 text-center w-50">
            <Card.Header className="bg-dark text-white">Feedback</Card.Header>
            <Card.Body>
                <Card.Text>
                 Rate from 1-5
                </Card.Text>
                <div className="d-flex justify-content-center">
                    <ReactStars count={5} onChange={ratingChanged} size={30} activeColor="#ffd700" />
                </div>
                <Button onClick={checkRating} className="mt-3">Submit</Button>
            </Card.Body>
            </Card>
            <ResubmitComplaint submitRating={submitRating} resubmit={resubmit} routeLogin={()=>routeLogin()} complaint={complaint}/>
        </>

    )
}

export default RatingComponent;