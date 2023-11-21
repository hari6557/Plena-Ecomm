import {
  ADD_TO_CART,
  ADD_TO_FAV,
  REMOVE_FROM_CART,
  REMOVE_FROM_FAV,
} from '../Actions/ActionTypes';

export interface State {
  fav: any[];
  cart: any[];
}

const initialState: State = {
  cart: [],
  fav: [],
};

const reducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      const productIdToRemove = action.payload;
      const index = state.cart.findIndex(item => item.id === productIdToRemove);

      if (index !== -1) {
        const updatedCart = [...state.cart];
        if (updatedCart[index].quantity > 1) {
          updatedCart[index].quantity--;
        } else {
          updatedCart.splice(index, 1);
        }

        return {
          ...state,
          cart: updatedCart,
        };
      }
      return state;
    case ADD_TO_FAV:
      return {
        ...state,
        fav: [...state.fav, action.payload],
      };
    case REMOVE_FROM_FAV:
      return {
        ...state,
        fav: state.fav.filter((productId) => productId !== action.payload)
      }
    default:
      return state;
  }
};

export default reducer;
