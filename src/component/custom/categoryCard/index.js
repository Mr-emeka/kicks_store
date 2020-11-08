import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ name, id, imgUrl }) => {
  return (
    <Link to={`/admin/dash/product/${name}/${id}`}>
      <div className="flex-column d-flex">
        <img src={imgUrl} alt={name} className="img-responsive" />
        <div>
          <h5>{name}</h5>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
