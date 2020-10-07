/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { addProduct } from '../../store/actions';

function Products() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);

  const handleClose = () => {
    const form = new FormData();
    form.append('quantity', quantity);
    form.append('name', name);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);

    productPictures.forEach((pic) => {
      form.append('productPicture', pic);
    });

    dispatch(addProduct(form));

    setShow(false);
  };

  const createCategoryList = (categories, options = []) => {
    categories.forEach((cat) => {
      options.push({
        value: cat._id,
        name: cat.name,
      });
      if (cat.children) {
        createCategoryList(cat.children, options);
      }
    });
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0],
    ]);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <button onClick={() => setShow(true)} type="button">Add</button>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        handleClose={handleClose}
        title="Add New Product"
      >

        <Input
          value={name}
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
          label="Name"
        />
        <Input
          value={quantity}
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          label="Quantity"
        />
        <Input
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          label="Price"
        />
        <Input
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
        />

        <select
          className="form-control"
          onChange={(e) => setCategoryId(e.target.value)}
          value={categoryId}
        >
          <option>select category</option>
          {
          createCategoryList(category.categories).map((cat) => (
            <option
              key={cat.value}
              value={cat.value}
            >
              { cat.name }
            </option>
          ))
        }
        </select>

        {
          productPictures.length
            ? productPictures.map((pic, i) => <div key={pic + i}>{pic && pic.name}</div>)
            : null
        }

        <input
          title="fdf"
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />

      </Modal>
    </Layout>
  );
}

export default Products;
