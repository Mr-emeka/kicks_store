import React from 'react';

const ProductCard = ({ name, id, imgUrl }) => {
  return (
    <div className="flex-column d-flex">
      <img src={imgUrl} height="240px" alt={name} className="img-responsive" />
      <div>
        <h5>{name}</h5>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-dark mr-4">Edit</button>
        <button className="btn btn-danger">Del</button>
      </div>
    </div>
  );
};

export default ProductCard;
