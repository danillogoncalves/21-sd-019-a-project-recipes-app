import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardMeals from '../components/CardMeals';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {
  callApiFoods,
  callApiMealsNationality,
  callApiMealsNationalityList,
} from '../redux/action/actionsAsysc';

export default function ExploreMealsNationality() {
  const dispatch = useDispatch();
  const nationalyList = useSelector((state) => state.mealsReducer.nationalyList);
  const [list, setList] = useState('All');

  function requestFilter(value) {
    if (value === 'All') {
      dispatch(callApiFoods('', 'all'));
    } else {
      dispatch(callApiMealsNationality(value));
    }
  }

  function handleChange({ target }) {
    const { value } = target;
    setList(value);
    requestFilter(value);
  }

  useEffect(() => {
    dispatch(callApiFoods('', 'all'));
    dispatch(callApiMealsNationalityList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Explore Nationalities" search />
      <select
        data-testid="explore-by-nationality-dropdown"
        value={ list }
        onChange={ handleChange }
      >
        <option
          data-testid="All-option"
        >
          All
        </option>
        {
          nationalyList.map(({ strArea }) => (
            <option
              key={ strArea }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>
          ))
        }
      </select>
      <CardMeals mazimumArraySize={ 12 } testid="-recipe-card" />
      <Footer />
    </div>
  );
}
