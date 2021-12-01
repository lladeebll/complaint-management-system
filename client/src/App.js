import {Routes, Route,BrowserRouter as Router} from 'react-router-dom';
import { Container } from "react-bootstrap";
import './App.css';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ComplaintPage from './pages/ComplaintPage';
import NavBar from './components/NavBar';
import { useState } from 'react';

function App() {
  const [log, setlog] = useState(localStorage.getItem('log')||false)
  const [actor, setActor] =useState(localStorage.getItem('actor')||'student')

  return (
    <>
        <Router>
          <NavBar log={log} logoutFunct={()=>{setlog(0);localStorage.clear()}}></NavBar>
          <Container className="container">
            <Routes>
              <Route path='/register' element={<RegistrationPage loginFunct={()=>{setlog(1);localStorage.setItem('log',1)}} setActor={(actor)=>setActor(actor)}/>} /> 
              <Route path='/home/' element={<HomePage logoutFunct={()=>{setlog(0);localStorage.clear()}} actor={actor}/>} /> 
              <Route path='/home/complaint' element={<ComplaintPage logoutFunct={()=>{setlog(0);localStorage.clear()}}/>} />
              <Route path='/'  element={<LoginPage  loginFunct={()=>{setlog(1);localStorage.setItem('log',1)}}  setActor={(actor)=>setActor(actor)}/>} />    
            </Routes>
          </Container>
        </Router> 
    </>
  );
}

export default App;
