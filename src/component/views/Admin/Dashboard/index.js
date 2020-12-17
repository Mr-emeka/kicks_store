import React, { useState, useEffect } from 'react';
import CategoryCard from '../../../custom/categoryCard';
import Modal from '../../../custom/Modal/';
import FormInput from '../../../custom/Input/';
import FileDrop from '../../../custom/Upload/';
import { connect } from 'react-redux';
import {
  toggleCatgoryModal,
  createCategory,
  fetchCategory,
} from '../../../../redux/actions';
import { selectCategorySections } from '../../../../redux/category/selectors';
import { bucket } from '../../../../helpers/Firebase';

const AdminDashboard = ({
  sections,
  loading,
  showModal,
  toggleCatgoryModal,
  createCategory,
  fetchCategory,
}) => {
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const [newCategory, setNewCategory] = useState({
    categoryName: '',
    imageUrl: '',
  });

  const handleChange = (value, name) => {
    setNewCategory({ ...newCategory, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.categoryName === '' && newCategory.imageUrl === '') {
      return;
    }
    createCategory(newCategory);
    toggleCatgoryModal();
    setNewCategory({
      categoryName: '',
      imageUrl: '',
    });
  };

  const handleUpload = async (file) => {
    var fileExtension = '.' + file.name.split('.').pop();
    var image =
      Math.random().toString(36).substring(7) +
      new Date().getTime() +
      fileExtension;
    const uploadTask = bucket.ref(`category/image/${image}`).put(file);
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
          .ref(`category/image`)
          .child(image)
          .getDownloadURL()
          .then((fireBaseUrl) =>
            setNewCategory({ ...newCategory, imageUrl: fireBaseUrl })
          );
      }
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-dark"
          onClick={() => toggleCatgoryModal(true)}
        >
          New Category
        </button>
      </div>
      <div className="my-4 grid">
        {sections.map(({ categoryName, routeName, id, imageUrl }, idx) => {
          return (
            <CategoryCard
              name={categoryName}
              id={id}
              imgUrl={imageUrl}
              key={idx}
              routeName={routeName}
            />
          );
        })}
      </div>
      <Modal setShowModal={toggleCatgoryModal} showModal={showModal}>
        <form className="my-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryName">Category Name</label>
            <FormInput
              type="text"
              id="categoryName"
              name="categoryName"
              ariaDescribedby="categoryName"
              placeholder="CategoryName"
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
  showModal: state.category.showEditModal,
  loading: state.category.loading,
  sections: selectCategorySections(state),
});
export default connect(mapStateToProps, {
  toggleCatgoryModal: toggleCatgoryModal,
  createCategory,
  fetchCategory,
})(AdminDashboard);
