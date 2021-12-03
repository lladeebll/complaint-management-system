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

  const logoutPost  = async () =>  {
    const url='/logout'
    let data={
      actor:localStorage.getItem('actor')
    }
    let res = await postData(url,data)
    console.log(res);
  }

  async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  return (
    <>
        <Router>
          <NavBar log={log} logoutFunct={async()=>{await logoutPost();setlog(0);}}></NavBar>
          <Container className="container">
            <Routes>
              <Route path='/register' element={<RegistrationPage loginFunct={()=>{setlog(1);localStorage.setItem('log',1)}} setActor={(actor)=>setActor(actor)}/>} /> 
              <Route path='/home/' element={<HomePage logoutFunct={async ()=>{await logoutPost(); setlog(0);localStorage.clear()}} actor={actor}/>} /> 
              <Route path='/home/complaint' element={<ComplaintPage logoutFunct={async ()=>{await logoutPost(); setlog(0);localStorage.clear()}} actor={actor}/>} />
              <Route path='/'  element={<LoginPage  loginFunct={()=>{setlog(1);localStorage.setItem('log',1)}}  setActor={(actor)=>setActor(actor)}/>} />    
            </Routes>
          </Container>
        </Router> 
    </>
  );
}

export default App;
