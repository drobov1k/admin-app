/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import Layout from '../../components/Layout';
import { addCategory, getAllCategory } from '../../store/actions';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';

function Category() {
  const [show, setShow] = useState(false);
  const [inputCategory, setInputCategory] = useState('');
  const [parentCategoryID, setParentCategoryID] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();

    form.append('name', inputCategory);
    form.append('parentId', parentCategoryID);
    form.append('categoryImage', categoryImage);
    dispatch(addCategory(form));

    setShow(false);
  };

  const category = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const renderCategories = (categories) => categories.map((cat) => (
    <li key={cat._id}>
      {cat.name}
      { cat.children ? <ul>{renderCategories(cat.children)}</ul> : null }
    </li>
  ));

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

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <button onClick={() => setShow(true)} type="button">Add</button>
            </div>

          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>
              { renderCategories(category.categories) }
            </ul>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        handleClose={handleClose}
        title="Add New Category"
      >
        <Input
          value={inputCategory}
          placeholder="Category Name"
          onChange={({ target }) => setInputCategory(target.value)}
        />

        <select
          className="form-control"
          onChange={(e) => setParentCategoryID(e.target.value)}
          value={parentCategoryID}
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

        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </Modal>
    </Layout>
  );
}

export default Category;
