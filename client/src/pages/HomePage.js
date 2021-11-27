import {Row, Col} from 'react-bootstrap';
import AddComplaint from "../components/AddComplaint";
import ComplaintList from "../components/ComplaintList";
import SearchComponent from "../components/SearchComponent";
import FilterComponent from "../components/FilterComponent";

const HomePage = () => {
    return (
        <>
            <Row className="mt-4">
                <Col sm={8}><SearchComponent/></Col>
                <Col className="d-flex justify-content-end"><FilterComponent/></Col>
            </Row>
            <AddComplaint/>
            <ComplaintList/>
        </>

    )
}

export default HomePage;