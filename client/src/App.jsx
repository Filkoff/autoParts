import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './components/pages/MainPage/MainPage';
import Login from './components/pages/Login/Login';
import Registration from './components/pages/Registration/Registration';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/header/Header/Header';
import styles from './App.module.scss';
import Profile from './components/pages/Profile/Profile';
import { auth } from './actions/user';
import { ThemeProvider } from '@material-ui/core';
import ChangeDealerPart from './components/pages/dealerPartsHandler/ChangeDealerPart/ChangeDealerPart';
import PartsList from './components/searchParts/PartsList/PartsList';
import PartsSet from './components/templates/PartsSet/PartsSet';
import AddPart from './components/templates/AddPart/AddPart';
import { getAllDealerParts } from './actions/dealer';
import CompareParts from './components/comparison/CompareParts/CompareParts';
import CompareResult from './components/comparison/CompareResult/CompareResult';
import CartContent from './components/cart/CartContent/CartContent';
import { theme } from './utils/theme';
import OrderForm from './components/OrderForm/OrderForm';
import PaymentSelect from './components/PaymentSelect/PaymentSelect';
import CreditCardForm from './components/CreditCardForm/CreditCardForm';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
import CartPopup from './components/cart/CartPopup/CartPopup';
import CustomerOrderList from './components/orderList/CustomerOrderList/CustomerOrderList';
import DealerOrderList from './components/orderList/DealerOrderList/DealerOrderList';
import { searchParts } from './actions/search';
import DealerInfo from './components/pages/DealerInfo/DealerInfo';
import ChatPage from './components/Chat/ChatPage/ChatPage';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const reloadingData = () => {
    dispatch(auth());
    dispatch(getAllDealerParts());
    dispatch(searchParts());
  };

  useEffect(() => {
    reloadingData();
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className={styles.app}>
            <Header />
            <div>
              {isAuth ? (
                <Switch>
                  <Route exact path="/profile" component={Profile} />
                  <Route
                    exact
                    path="/dealer/parts/:id"
                    component={ChangeDealerPart}
                  />
                  <Redirect exact from="/profile" to="/profile/about" />
                  <Route
                    exact
                    path="/profile/:page?"
                    render={(props) => <Profile {...props} />}
                  />
                  <Route exact path="/choose-part" component={PartsSet} />
                  <Route
                    exact
                    path="/dealer/parts/add/:id"
                    component={AddPart}
                  />
                  <Route exact path="/popup/cart" component={CartPopup} />
                  <Route exact path="/cart" component={CartContent} />
                  <Route exact path="/order" component={OrderForm} />
                  <Route
                    exact
                    path="/user/orders"
                    component={CustomerOrderList}
                  />
                  <Route
                    exact
                    path="/dealer/orders"
                    component={DealerOrderList}
                  />
                  <Route
                    exact
                    path="/order/card-data"
                    component={CreditCardForm}
                  />
                  <Route
                    exact
                    path="/order/payment-type"
                    component={PaymentSelect}
                  />
                  <Route
                    exact
                    path="/order/success"
                    component={OrderConfirmation}
                  />
                  <Route exact path="/chat" component={ChatPage} />
                  <Route exact path="/chat/:id" component={ChatPage} />
                </Switch>
              ) : null}
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/" component={MainPage} />
                <Route exact path="/main" component={MainPage} />
                <Route exact path="/search" component={PartsList} />
                <Route exact path="/compare" component={CompareParts} />
                <Route exact path="/compare/:id" component={CompareResult} />
                <Route exact path="/dealer/profile" component={DealerInfo} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
