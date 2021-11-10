import { Container } from 'react-bootstrap'
import RegistrationForm from '../components/RegistrationForm'

const RegistrationPage = () => {
    return (
        <div className="d-flex justify-content-center">
            <Container>
            <RegistrationForm></RegistrationForm>
            </Container>
        </div>
    )
}

export default RegistrationPage
