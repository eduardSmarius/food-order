import React, { useEffect, useState } from 'react';

///////// Create Context Object //////////
const CartContext = React.createContext({});

///////// Context Component ///////////////
export const CartContextProvider = (props) => {
  ///////// State Declaration //////////////
  const [cartItems, setCartItems] = useState({});
  const [cartItemsNr, setCartItemsNr] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartVisibility, setCartVisibility] = useState(false);

  useEffect(() => {
    ////// Calculate & set cartTotalPrice state ///////

    setCartTotalPrice((prevPrice) => {
      let totPrice = 0;
      Object.values(cartItems).forEach((obj) => {
        totPrice = totPrice + obj.price;
      });
      return totPrice;
    });

    ////// Calculate & set cartItemsNr state ///////
    let totNr = 0;
    Object.values(cartItems).forEach((obj) => {
      totNr = totNr + obj.quantity;
    });

    setCartItemsNr(totNr);
  }, [cartItems, cartItemsNr]);

  //////// Add items to cart //////////
  const addItemsToCart = (e, currentItem) => {
    e.preventDefault();

    if (!currentItem.quantity) return;

    setCartItems((prevCart) => {
      if (!prevCart[currentItem.name]) {
        return {
          ...prevCart,
          [currentItem.name]: Object.assign({}, currentItem, {
            price: currentItem.price * currentItem.quantity,
          }),
        };
      } else {
        let replaceCurrentItem = Object.assign(
          {},
          currentItem,
          {
            quantity:
              currentItem.quantity + prevCart[currentItem.name].quantity,
          },
          {
            price:
              prevCart[currentItem.name].price +
              currentItem.price * currentItem.quantity,
          }
        );

        return {
          ...prevCart,
          [currentItem.name]: replaceCurrentItem,
        };
      }
    });
  };

  /////// Minus Cart Item/////////
  const minusCartItem = (itemName) => {
    if (cartItems[itemName].quantity - 1 === 0) {
      setCartItems((prevCart) => {
        return Object.fromEntries(
          Object.entries(prevCart).filter((arr) => arr[0] !== itemName)
        );
      });
    } else {
      setCartItems((prevCart) => {
        let singleItemPrice =
          prevCart[itemName].price / prevCart[itemName].quantity;
        return {
          ...prevCart,
          [itemName]: Object.assign(
            {},
            prevCart[itemName],
            {
              quantity: prevCart[itemName].quantity - 1,
            },
            {
              price: prevCart[itemName].price - singleItemPrice,
            }
          ),
        };
      });
    }
  };

  ////// Plus Cart Item /////////
  const plusCartItem = (itemName) => {
    setCartItems((prevCart) => {
      let singleItemPrice =
        prevCart[itemName].price / prevCart[itemName].quantity;
      return {
        ...prevCart,
        [itemName]: Object.assign(
          {},
          prevCart[itemName],
          {
            quantity: prevCart[itemName].quantity + 1,
          },
          {
            price: prevCart[itemName].price + singleItemPrice,
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
        cartItems: cartItems,
        cartItemsNr: cartItemsNr,
        cartVisibility: cartVisibility,
        cartTotalPrice: cartTotalPrice,
        addItemsToCart: addItemsToCart,
        minusCartItem: minusCartItem,
        plusCartItem: plusCartItem,
        showCart: showCart,
        hideCart: hideCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
