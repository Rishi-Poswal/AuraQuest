import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const closeNav = () => setExpanded(false);

  // Logout function using Axios
  const handleSignOut = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/auth/logout`);
      navigate('/signin'); // Redirect to Sign In page
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };
  
  // Get user data from Redux store
  const user1 = useSelector((state) => state.auth.user);
  
  // Ensure user data is loaded
  if (!user1) {
    return null; // or return a loading state until user data is fetched
  }

  // Destructure the user properties from Redux
  const { username, email, profilePic } = user1;

  return (
    <>
      <Navbar 
        bg="white" 
        expand="lg" 
        expanded={expanded}
        onToggle={setExpanded}
        className="navbar-light border-bottom fixed-top shadow-sm"
        style={{ minHeight: '70px' }}
      >
        <Container fluid className="px-3 px-lg-5">
          {/* Logo */}
          <Navbar.Brand href="/" className="me-4">
            <img
              src="auraquest logo 2.png"
              alt="AuraQuest"
              height="40"
              className="d-inline-block align-top"
              style={{ maxWidth: '250px', objectFit: 'contain' }}
            />
          </Navbar.Brand>

          {/* Navbar Toggle */}
          <div className="order-lg-last">
            <NavDropdown
              title={
                <div className="d-inline-flex align-items-center">
                  <img
                    src={profilePic || '/default-avatar.png'} // Fallback to default avatar
                    alt="Profile"
                    className="rounded-circle border border-2"
                    width="40"
                    height="40"
                  />
                  <span className="d-none d-lg-inline ms-2 text-secondary">
                    {username}
                  </span>
                </div>
              }
              id="nav-dropdown-profile"
              align="end"
              className="me-2 nav-dropdown-profile"
            >
              <div className="px-3 py-2 bg-light rounded-top">
                <p className="mb-0 fw-semibold">{username}</p>
                <small className="text-muted">{email}</small>
              </div>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#profile" onClick={closeNav}>
                <i className="bi bi-person me-2"></i>View Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#settings" onClick={closeNav}>
                <i className="bi bi-gear me-2"></i>Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignOut} className="text-danger">
                <i className="bi bi-box-arrow-right me-2"></i>Sign out
              </NavDropdown.Item>
            </NavDropdown>
          </div>

          {/* Navbar Toggle Button for Mobile */}
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            className="border-0 shadow-none ms-2 custom-toggler"
          >
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          {/* Navigation Links */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link 
                href="/dashboard" 
                className="px-3 py-2 nav-link-hover"
                onClick={closeNav}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link 
                href="/calendar" 
                className="px-3 py-2 nav-link-hover"
                onClick={closeNav}
              >
                Calendar
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Overlay for mobile */}
      {expanded && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-25"
          style={{ marginTop: '70px', zIndex: 100 }}
          onClick={closeNav}
        />
      )}
    </>
  );
}

export default NavigationBar;
