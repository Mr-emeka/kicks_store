import React, { useEffect } from 'react';
import AppLayout from '../../layouts/AppLayout';
import CategoryCard from '../../custom/categoryCard';
import { connect } from 'react-redux';
import { fetchCategory } from '../../../redux/actions';
import { selectCategorySections } from '../../../redux/category/selectors';

const Home = ({ sections, fetchCategory }, props) => {
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);
  return (
    <AppLayout>
      <div>
        <h1>Here</h1>
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
      </div>
    </AppLayout>
  );
};

const mapStateToProps = (state) => ({
  loading: state.category.loading,
  sections: selectCategorySections(state),
});
export default connect(mapStateToProps, {
  fetchCategory,
})(Home);
