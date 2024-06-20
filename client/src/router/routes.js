import CartContent from '../components/cart/CartContent/CartContent';
import CartPopup from '../components/cart/CartPopup/CartPopup';
import ChatPage from '../components/Chat/ChatPage/ChatPage';
import CompareParts from '../components/comparison/CompareParts/CompareParts';
import CompareResult from '../components/comparison/CompareResult/CompareResult';
import CreditCardForm from '../components/CreditCardForm/CreditCardForm';
import OrderConfirmation from '../components/OrderConfirmation/OrderConfirmation';
import OrderForm from '../components/OrderForm/OrderForm';
import CustomerOrderList from '../components/orderList/CustomerOrderList/CustomerOrderList';
import DealerOrderList from '../components/orderList/DealerOrderList/DealerOrderList';
import DealerInfo from '../components/pages/DealerInfo/DealerInfo';
import ChangeDealerPart from '../components/pages/dealerPartsHandler/ChangeDealerPart/ChangeDealerPart';
import Login from '../components/pages/Login/Login';
import MainPage from '../components/pages/MainPage/MainPage';
import Profile from '../components/pages/Profile/Profile';
import Registration from '../components/pages/Registration/Registration';
import PartsList from '../components/searchParts/PartsList/PartsList';
import AddPart from '../components/templates/AddPart/AddPart';
import PartsSet from '../components/templates/PartsSet/PartsSet';

export const publicRoutes = [
  {
    path: '/',
    component: MainPage,
    exact: true,
  },
  {
    path: '/main',
    component: MainPage,
    exact: true,
  },
  {
    path: '/search',
    component: PartsList,
    exact: true,
  },
  {
    path: '/compare',
    component: CompareParts,
    exact: true,
  },
  {
    path: '/compare/:id',
    component: CompareResult,
    exact: true,
  },
  {
    path: '/registration',
    component: Registration,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/dealer/profile',
    component: DealerInfo,
    exact: true,
  },
];

export const privateRoutes = [
  {
    path: '/',
    component: MainPage,
    exact: true,
  },
  {
    path: '/main',
    component: MainPage,
    exact: true,
  },

  {
    path: '/search',
    component: PartsList,
    exact: true,
  },
  {
    path: '/compare',
    component: CompareParts,
    exact: true,
  },
  {
    path: '/compare/:id',
    component: CompareResult,
    exact: true,
  },
  {
    path: '/dealer/profile',
    component: DealerInfo,
    exact: true,
  },
  {
    path: '/profile/:page',
    component: Profile,
    exact: true,
  },
  {
    path: '/dealer/parts/:id',
    component: ChangeDealerPart,
    exact: true,
  },
  {
    path: '/choose-part',
    component: PartsSet,
    exact: true,
  },
  {
    path: '/dealer/parts/add/:id',
    component: AddPart,
    exact: true,
  },
  {
    path: '/popup/cart',
    component: CartPopup,
    exact: true,
  },
  {
    path: '/cart',
    component: CartContent,
    exact: true,
  },
  {
    path: '/order',
    component: OrderForm,
    exact: true,
  },
  {
    path: '/user/orders',
    component: CustomerOrderList,
    exact: true,
  },
  {
    path: '/dealer/orders',
    component: DealerOrderList,
    exact: true,
  },
  {
    path: '/order/card-data',
    component: CreditCardForm,
    exact: true,
  },
  {
    path: '/order/success',
    component: OrderConfirmation,
    exact: true,
  },
  {
    path: '/chat',
    component: ChatPage,
    exact: true,
  },
  {
    path: '/chat/:id',
    component: ChatPage,
    exact: true,
  },
];
