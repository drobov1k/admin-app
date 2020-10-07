/* eslint-disable no-unused-expressions */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { signout } from '../../store/actions/auth.action';

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedLinks = () => (
    <Nav onClick={logout}>
      <li className="nav-item">
        <span className="nav-link">Signout</span>
      </li>
    </Nav>
  );

  const renderNonLoggedLinks = () => (
    <Nav>
      <li className="nav-item">
        <NavLink to="signin" className="nav-link">Signin</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="signup" className="nav-link">Signup</NavLink>
      </li>
    </Nav>
  );

  return (
    <Navbar style={{ zIndex: 1 }} collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Link to="/" className="navbar-brand">Admin Dashboard</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          { auth.authenticate ? renderLoggedLinks() : renderNonLoggedLinks() }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
