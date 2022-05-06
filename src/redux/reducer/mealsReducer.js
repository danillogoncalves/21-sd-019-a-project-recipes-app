import {
  SEARCH_MEALS,
  SEARCH_CATEGORY,
  SEARCH_MEAL_ID,
  SEARCH_MEAL_RANDOM,
  SEARCH_NATIONALY_LIST,
  SEARCH_NATIONALY,
  SEARCH_MEALS_INGREDIENTS,
} from '../action';

const INITIAL_STATE = {
  meals: [],
  meal: {},
  nationalyList: [],
  ingredients: [],
};

const mealsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_MEALS:
    return {
      ...state,
      meals: action.search,
    };
  case SEARCH_CATEGORY:
    return {
      ...state,
      categories: action.search,
    };
  case SEARCH_MEAL_ID:
    return {
      ...state,
      meal: action.meal[0],
    };
  case SEARCH_MEAL_RANDOM:
    return {
      ...state,
      meal: action.mealRandom[0],
    };
  case SEARCH_NATIONALY_LIST:
    return {
      ...state,
      nationalyList: action.nationalityList,
    };
  case SEARCH_NATIONALY:
    return {
      ...state,
      meals: action.nationality,
    };
  case SEARCH_MEALS_INGREDIENTS:
    return {
      ...state,
      ingredients: action.mealsIngredients,
    };
  default:
    return state;
  }
};

export default mealsReducer;
