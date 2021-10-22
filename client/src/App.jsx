import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/header/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './App.module.scss';
import { auth } from './actions/user';
import { ThemeProvider } from '@material-ui/core';
import { getAllDealerParts } from './actions/dealer';
import { theme } from './styles/theme';
import { searchParts } from './actions/search';
import AppRouter from './router/AppRouter';

function App() {
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
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className={styles.app}>
            <Header />
            <div className={styles.mainContent}>
              <AppRouter />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
