import React from 'react';
import {
  Box,
  Button,
  NativeSelect,
  Tab,
  Tabs,
  TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllParts } from '../../actions/data';
import { searchParts } from '../../actions/search';
import { CATEGORIES } from '../../consts/index';
import styles from './Search.module.scss';

function Search() {
  const [searchData, setSearchData] = useState({
    category: '',
    model: '',
    name: '',
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const searchButton = (
    <NavLink to="/search">
      <Button
        id="searchButton"
        className={styles.button}
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(
            searchParts(searchData.category, searchData.model, searchData.name)
          );
        }}
      >
        {t('searchButton')}
      </Button>
    </NavLink>
  );

  const compareButton = (
    <NavLink to="/compare">
      <Button
        id="compareButton"
        className={styles.button}
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(getAllParts());
        }}
      >
        {t('compare')}
      </Button>
    </NavLink>
  );

  const searchForm = () => (
    <div className={styles.searchField}>
      <div className={styles.singleSearch}>
        <div className={styles.label}>{t('category')}:</div>
        <NativeSelect
          id="category"
          onChange={(e) =>
            setSearchData({ ...searchData, category: e.target.value })
          }
          value={searchData.category}
          className={styles.input1}
        >
          <option value=""></option>
          {CATEGORIES.map((item) => {
            return (
              <option key={item} value={`${item}`}>
                {item}
              </option>
            );
          })}
        </NativeSelect>
      </div>
      <div className={styles.singleSearch}>
        <div className={styles.label}>{t('model')}:</div>
        <TextField
          id="model"
          className={styles.input}
          variant="outlined"
          value={searchData.model}
          type="text"
          onChange={(e) =>
            setSearchData({ ...searchData, model: e.target.value })
          }
        />
      </div>
      <div className={styles.singleSearch}>
        <div className={styles.label}>{t('partName')}:</div>
        <TextField
          className={styles.input}
          variant="outlined"
          id="name"
          value={searchData.name}
          type="text"
          onChange={(e) =>
            setSearchData({ ...searchData, name: e.target.value })
          }
        />
      </div>
      {value === 0 && searchButton}
      {value === 1 && compareButton}
    </div>
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>{t('mainSearch')}</h2>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              className={styles.tabs}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab id="searchTab" label={t('searchButton')} />
              <Tab id="compareTab" label={t('compareParts')} />
            </Tabs>
          </Box>
          {searchForm()}
        </Box>
      </div>
    </div>
  );
}

export default Search;
