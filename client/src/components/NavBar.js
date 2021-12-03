import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';



const NavBar = ({log,logoutFunct}) => {

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {!log&&<Nav>
            <Nav.Link as={Link} to="/">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </Nav>}
          {log&&
            <Nav>
              <Nav.Link as={Link} onClick={async()=>await logoutFunct()} to="/">Logout</Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    )
}

export default NavBar;