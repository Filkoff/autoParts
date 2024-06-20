import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Header from './components/header/Header/Header';
import Footer from './components/Footer/Footer';
import AppRouter from './router/AppRouter';
import { auth } from './actions/user';
import { getAllDealerParts } from './actions/dealer';
import { searchParts } from './actions/search';
import { theme } from './styles/theme';
import styles from './App.module.scss';

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
