import {
  Box,
  Button,
  NativeSelect,
  Tab,
  Tabs,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllParts } from '../../actions/data';
import { searchParts } from '../../actions/search';
import styles from './Search.module.scss';
import { categories } from '../../consts/partsCatrgories';
import { useTranslation } from 'react-i18next';

function Search() {
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');
  const [name, setnName] = useState('');
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
          dispatch(searchParts(category, model, name));
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

  const searchForm = (value) => (
    <>
      <div className={styles.searchField}>
        <div className={styles.singleSearch}>
          <p className={styles.label}>{t('category')}:</p>
          <NativeSelect
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className={styles.input1}
          >
            <option value=""></option>
            {categories.map((item, index) => {
              return (
                <option key={index} value={`${item}`}>
                  {item}
                </option>
              );
            })}
          </NativeSelect>
        </div>
        <div className={styles.singleSearch}>
          <p className={styles.label}>{t('model')}:</p>
          <TextField
            id="model"
            className={styles.input}
            variant="outlined"
            value={model}
            type="text"
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className={styles.singleSearch}>
          <p className={styles.label}>{t('partName')}:</p>
          <TextField
            className={styles.input}
            variant="outlined"
            id="name"
            value={name}
            type="text"
            onChange={(e) => setnName(e.target.value)}
          />
        </div>
        {value === 0 && searchButton}
        {value === 1 && compareButton}
      </div>
    </>
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
          {value === 0 && searchForm(value)}
          {value === 1 && searchForm(value)}
        </Box>
      </div>
    </div>
  );
}

export default Search;
