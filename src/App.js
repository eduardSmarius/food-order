import { Fragment, useContext } from 'react';
import NavBar from './components/header/NavBar';
import Header from './components/header/Header';
import FoodMenu from './components/foodMenu/FoodMenu';
import CartContext from './context/cartContext';
import Cart from './components/cart/Cart';

const App = () => {
  const ctx = useContext(CartContext);
  return (
    <Fragment>
      {ctx.cartVisibility && <Cart />}
      <NavBar />
      <Header />
      <FoodMenu />
    </Fragment>
  );
};

export default App;
