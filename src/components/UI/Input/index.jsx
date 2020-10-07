import React from 'react';
import { Form } from 'react-bootstrap';

function Input({
  label, type, placeholder, errorMsg, value, onChange,
}) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Form.Text className="text-muted">
        {errorMsg}
      </Form.Text>
    </Form.Group>
  );
}

export default Input;
