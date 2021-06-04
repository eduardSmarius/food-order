import { Fragment, useContext } from 'react';
import NavBar from './components/navBar/NavBar';
import Header from './components/header/Header';
import FoodMenu from './components/foodMenu/FoodMenu';
import CartContext from './components/context/cartContext';
import Modal from './components/Modal/Modal';

const App = () => {
  const ctx = useContext(CartContext);
  return (
    <Fragment>
      <NavBar />
      <Header />
      <FoodMenu />
      {ctx.cartVisibility && <Modal />}
    </Fragment>
  );
};

export default App;
