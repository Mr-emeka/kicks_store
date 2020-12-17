import React, { useState, useEffect } from 'react';
import FormInput from '../../../custom/Input/';
import FileDrop from '../../../custom/Upload/';
import ProductCard from '../../../custom/productCard/';
import { Category } from '../../../../dummy_data';
import Modal from '../../../custom/Modal/';
import {
  toggleProductModal,
  createProduct,
  fetchProduct,
} from '../../../../redux/actions';
import { bucket } from '../../../../helpers/Firebase';
import { connect } from 'react-redux';
import { selectCollections } from '../../../../redux/product/selectors';

const AdminDashboard = ({
  loading,
  showModal,
  toggleProductModal,
  createProduct,
  fetchProduct,
  products,
  match,
}) => {
  useEffect(() => {
    fetchProduct(match.params.id);
  }, [fetchProduct, match.params.id]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    imageUrl: '',
    price: 0,
  });
  const [id] = useState(match.params.id);
  const handleChange = (value, name) => {
    setNewProduct({ ...newProduct, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProduct.categoryName === '' && newProduct.imageUrl === '') {
      return;
    }
    createProduct(id, newProduct);
    toggleProductModal(false);
    setNewProduct({
      name: '',
      imageUrl: '',
      price: 0,
    });
  };

  const handleUpload = async (file) => {
    var fileExtension = '.' + file.name.split('.').pop();
    var image = Math.random().toString(36).substring(10) + fileExtension;
    const uploadTask = bucket.ref(`products/image/${image}`).put(file);
    uploadTask.on(
      'state_changed',
      (snapShot) => {
        console.log(snapShot);
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        console.log(Math.floor(progress));
      },
      (err) => {
        console.log(err);
      },
      () => {
        bucket
          .ref(`products/image`)
          .child(image)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            console.log(fireBaseUrl);
            setNewProduct({ ...newProduct, imageUrl: fireBaseUrl });
          });
      }
    );
  };
  return (
    <div>
      <h3>Category: {match.params.name}</h3>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-dark"
          onClick={() => toggleProductModal(true)}
        >
          New Product
        </button>
      </div>
      <div className="my-4 grid">
        {products.map(({ name, id, imageUrl }, idx) => {
          return <ProductCard name={name} id={idx} imgUrl={imageUrl} />;
        })}
      </div>
      <Modal setShowModal={toggleProductModal} showModal={showModal}>
        <form className="my-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryName">Product Name</label>
            <FormInput
              type="text"
              id="name"
              name="name"
              ariaDescribedby="name"
              placeholder="Product Name"
              callback={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Product Price</label>
            <FormInput
              type="number"
              id="price"
              name="price"
              ariaDescribedby="price"
              placeholder="Product Price"
              callback={handleChange}
            />
          </div>
          <div>
            <FileDrop handleDrop={handleUpload} />
          </div>
          <div className="my-3">
            <button className="btn btn-dark" type="submit">
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  showModal: state.product.showEditModal,
  loading: state.product.loading,
  products: selectCollections(state),
});
export default connect(mapStateToProps, {
  toggleProductModal: toggleProductModal,
  createProduct,
  fetchProduct,
})(AdminDashboard);
