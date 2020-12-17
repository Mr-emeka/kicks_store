import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ name, routeName, id, imgUrl }) => {
  return (
    <Link to={`/admin/dash/product/${routeName}/${id}`}>
      <div className="flex-column d-flex">
        <img
          src={imgUrl}
          height="240px"
          alt={name}
          className="img-responsive"
        />
        <div>
          <h5>{name}</h5>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
