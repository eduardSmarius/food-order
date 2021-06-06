import React, { useState, useReducer } from 'react';

///////// Create Context Object //////////
const CartContext = React.createContext({});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

/////////// Reducer /////////////
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      (meal) => meal.id === action.item.id
    );

    const existingItem = state.items[existingItemIndex];
    let updatedItems;

    if (existingItem) {
      let updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === 'REMOVE') {
    let updatedItem = state.items.find((meal) => meal.id === action.id);
    updatedItem.amount--;
    let updatedItems = [...state.items];
    let cartItemIndex = state.items.findIndex((item) => item.id === action.id);

    const updatedTotalAmount = state.totalAmount - updatedItem.price;

    if (updatedItem.amount === 0) {
      updatedItems.splice(cartItemIndex, 1);
    } else {
      updatedItems[cartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

//////////// Main Context Component ////////
export const CartContextProvider = (props) => {
  const [cartVisibility, setCartVisibility] = useState(false);
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addMealsToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeMealsFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  ///////// Show & hide cart modal ////////
  const showCart = () => {
    setCartVisibility(true);
  };

  const hideCart = () => {
    setCartVisibility(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartMeals: cartState.items,
        cartVisibility: cartVisibility,
        cartTotalPrice: cartState.totalAmount,
        addMealsToCart: addMealsToCartHandler,
        removeMealsFromCart: removeMealsFromCartHandler,
        // minusCartMeal: minusCartMeal,
        // // plusCartMeal: plusCartMeal,
        showCart: showCart,
        hideCart: hideCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
