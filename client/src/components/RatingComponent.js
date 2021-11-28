import {React, useState} from 'react';
import { Button, Card } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";


const RatingComponent = () => {

    const [rating,setRating] = useState(0);

    const ratingChanged = (newRating) => {
        setRating(newRating);
    }

    const submitRating = () => {
        console.log(rating);
    }

    return (
        <>
            <Card className="w-25 mt-3">
            <Card.Header>Feedback</Card.Header>
            <Card.Body>
                <Card.Text>
                 Rate from 1-5
                </Card.Text>
                <ReactStars count={5} onChange={ratingChanged} size={24} activeColor="#ffd700" />
                <Button onClick={submitRating} className="mt-3">Submit</Button>
            </Card.Body>
            </Card>
            
        </>

    )
}

export default RatingComponent;