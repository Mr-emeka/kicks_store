import React, { useState } from "react";

import ProductCard from "../../../custom/productCard/";
import { Category } from "../../../../dummy_data";
import Modal from "../../../custom/Modal/";

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-dark" onClick={() => setShowModal(true)}>
          New Product
        </button>
      </div>
      <div className="my-4 grid">
        {Category.map(({ name, id, imgUrl }, idx) => {
          return <ProductCard name={name} id={id} imgUrl={imgUrl} />;
        })}
      </div>
      <Modal setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

export default AdminDashboard;
