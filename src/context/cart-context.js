import React, { useEffect, useState, useReducer } from 'react';

///////// Create Context Object //////////
const CartContext = React.createContext({});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  return defaultCartState;
};

///////// Context Component ///////////////
export const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  ///////// State Declaration //////////////
  const [cartMeals, setCartMeals] = useState({});
  const [cartMealsNr, setCartMealsNr] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartVisibility, setCartVisibility] = useState(false);

  useEffect(() => {
    ////// Calculate & set cartTotalPrice state ///////

    setCartTotalPrice((prevPrice) => {
      let totPrice = 0;
      Object.values(cartMeals).forEach((obj) => {
        totPrice = totPrice + obj.price;
      });
      return totPrice;
    });

    ////// Calculate & set cartMealsNr state ///////
    let totNr = 0;
    Object.values(cartMeals).forEach((obj) => {
      totNr = totNr + obj.quantity;
    });

    setCartMealsNr(totNr);
  }, [cartMeals, cartMealsNr]);

  //////// Add meals to cart //////////
  const addMealsToCart = (e, currentMeal) => {
    e.preventDefault();

    if (!currentMeal.quantity) return;

    setCartMeals((prevCart) => {
      if (!prevCart[currentMeal.name]) {
        return {
          ...prevCart,
          [currentMeal.name]: Object.assign({}, currentMeal, {
            price: currentMeal.price * currentMeal.quantity,
          }),
        };
      } else {
        let replaceCurrentMeal = Object.assign(
          {},
          currentMeal,
          {
            quantity:
              currentMeal.quantity + prevCart[currentMeal.name].quantity,
          },
          {
            price:
              prevCart[currentMeal.name].price +
              currentMeal.price * currentMeal.quantity,
          }
        );

        return {
          ...prevCart,
          [currentMeal.name]: replaceCurrentMeal,
        };
      }
    });
  };

  /////// Minus Cart Meal/////////
  const minusCartMeal = (mealName) => {
    if (cartMeals[mealName].quantity - 1 === 0) {
      setCartMeals((prevCart) => {
        return Object.fromEntries(
          Object.entries(prevCart).filter((arr) => arr[0] !== mealName)
        );
      });
    } else {
      setCartMeals((prevCart) => {
        let singleMealPrice =
          prevCart[mealName].price / prevCart[mealName].quantity;
        return {
          ...prevCart,
          [mealName]: Object.assign(
            {},
            prevCart[mealName],
            {
              quantity: prevCart[mealName].quantity - 1,
            },
            {
              price: prevCart[mealName].price - singleMealPrice,
            }
          ),
        };
      });
    }
  };

  ////// Plus Cart Meal /////////
  const plusCartMeal = (mealName) => {
    setCartMeals((prevCart) => {
      let singleMealPrice =
        prevCart[mealName].price / prevCart[mealName].quantity;
      return {
        ...prevCart,
        [mealName]: Object.assign(
          {},
          prevCart[mealName],
          {
            quantity: prevCart[mealName].quantity + 1,
          },
          {
            price: prevCart[mealName].price + singleMealPrice,
          }
        ),
      };
    });
  };

  ///////// Show cart modal ////////
  const showCart = () => {
    setCartVisibility(true);
  };

  const hideCart = () => {
    setCartVisibility(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartMeals: cartMeals,
        cartMealsNr: cartMealsNr,
        cartVisibility: cartVisibility,
        cartTotalPrice: cartTotalPrice,
        addMealsToCart: addMealsToCart,
        minusCartMeal: minusCartMeal,
        plusCartMeal: plusCartMeal,
        showCart: showCart,
        hideCart: hideCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
