import React, { useState } from 'react';
import { Button, Input, NativeSelect } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import shortid from 'shortid';
import { addNewPart } from '../../../actions/dealer';
import styles from './AddPart.module.scss';

function AddPart() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const parts = useSelector((state) => state.parts.result);
  const currentPartArr = parts.filter((item) => item.id === id);
  const currentPart = currentPartArr[0];
  const category = currentPart.category;
  const name = currentPart.name;
  const [description, setDescription] = useState('');
  const models = currentPart.models;
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState(0);
  const [production, setProduction] = useState('');
  const [img, setImg] = useState('/assets/images/gear.png');
  const { t } = useTranslation();
  const partId = shortid.generate();

  const addPartHandler = () => {
    dispatch(
      addNewPart(
        partId,
        category,
        name,
        description,
        models,
        img,
        condition,
        price,
        production
      )
    );
  };

  async function inputHandler(e) {
    const img = URL.createObjectURL(e.target.files[0]);
    setImg(img);
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.heading}>{t('yourPart')}</h1>

        <div className={styles.imageHandler}>
          <div>
            {img ? <img className={styles.image} src={img} alt="part" /> : null}
          </div>
          <div>
            <input
              id="file"
              onInput={(e) => {
                inputHandler(e);
              }}
              className={styles.btnLoadInput}
              name="upload"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              placeholder="Load picture"
            />
            <label className={styles.label} htmlFor="file">
              {t('choosePhoto')}
            </label>
          </div>
        </div>
        <div className={styles.info}>
          <b>{t('category')}</b>: {currentPart.category}
        </div>
        <div className={styles.info}>
          <b>{t('partName')}:</b> {currentPart.name}
        </div>
        <div className={styles.info}>
          <b>{t('description')}: </b>
          <Input
            id="description"
            className={styles.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.info}>
          <b>{t('model')}:</b> {currentPart.models}
        </div>
        <div className={styles.info}>
          <b>{t('condition')}: </b>
          <NativeSelect
            id="condition"
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value={''}></option>
            <option value={'новая'}>{t('new')}</option>
            <option value={'б/у'}>{t('used')}</option>
          </NativeSelect>
        </div>
        <div className={styles.info}>
          <b>{t('price')}: </b>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className={styles.info}>
          <b>{t('production')}: </b>
          <Input
            id="production"
            value={production}
            onChange={(e) => setProduction(e.target.value)}
          />
        </div>
        <NavLink to="/profile/myParts">
          <Button
            id="addPartButton"
            className={styles.button}
            variant="contained"
            color="primary"
            onClick={addPartHandler}
          >
            {t('save')}
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default AddPart;
