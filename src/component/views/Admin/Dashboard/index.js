import React, { useState } from "react";
import { connect } from "react-redux";
import CategoryCard from "../../../custom/categoryCard";
import { Category } from "../../../../dummy_data";
import Modal from "../../../custom/Modal/";
import FormInput from "../../../custom/Input/";
import FileDrop from "../../../custom/Upload/";

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleChange = (value, name) => {
    console.log(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-dark" onClick={() => setShowModal(true)}>
          New Category
        </button>
      </div>
      <div className="my-4 grid">
        {Category.map(({ name, id, imgUrl }, idx) => {
          return <CategoryCard name={name} id={id} imgUrl={imgUrl} />;
        })}
      </div>
      <Modal setShowModal={setShowModal} showModal={showModal}>
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
            <FileDrop handleDrop={console.log} />
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

export default AdminDashboard;
