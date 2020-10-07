import React, { useState } from 'react';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { signup } from '../../store/actions';

function Signup() {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignup = (e) => {
    e.preventDefault();
    dispatch(signup({
      firstName, lastName, email, password,
    }));
  };

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  if (user.loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <Container>
        { user.message }
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="Enter First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => { setFirstName(e.target.value); }}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Enter Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => { setLastName(e.target.value); }}
                  />
                </Col>
              </Row>

              <Input
                label="Email"
                placeholder="Enter Email"
                value={email}
                type="email"
                onChange={(e) => { setEmail(e.target.value); }}
              />

              <Input
                label="Password"
                placeholder="Enter Password"
                value={password}
                type="password"
                onChange={(e) => { setPassword(e.target.value); }}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signup;
