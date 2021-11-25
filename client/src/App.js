import {Routes, Route,BrowserRouter as Router} from 'react-router-dom';
import { Container } from "react-bootstrap";
import './App.css';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import StudentPage from './pages/StudentPage';
import NavBar from './components/NavBar';


function App() {


  return (
    <>
        <Router>
          <NavBar></NavBar>
          <Container className="container">
            <Routes>
              <Route path='/register' element={<RegistrationPage/>} /> 
              <Route path='/studentpage' element={<StudentPage/>} /> 
              <Route path='/' element={<LoginPage/>} />    
            </Routes>
          </Container>
        </Router> 
    </>
  );
}

export default App;
