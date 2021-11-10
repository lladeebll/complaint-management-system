
import './App.css';
import RegistrationPage from './pages/RegistrationPage';
import LoginForm from './components/LoginForm';
import { Container } from 'react-bootstrap';

function App() {


  return (
    <Container>
      {/* <RegistrationPage></RegistrationPage> */}
      <LoginForm></LoginForm>
    </Container>
  );
}

export default App;
