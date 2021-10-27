import React, { useState } from 'react';
import { Button, Input, NativeSelect } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { string, func } from 'prop-types';
import styles from './PartOptions.module.scss';

function PartOptions({ newId, setPart }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dealerParts = useSelector((state) => state.dealer.result);
  const currentPartArr = dealerParts.filter((item) => item.id === id);
  const currentPart = currentPartArr[0];
  const category = currentPart.category;
  const name = currentPart.name;
  const [description, setDescription] = useState(currentPart.description);
  const models = currentPart.models;
  const [condition, setCondition] = useState(currentPart.condition);
  const [price, setPrice] = useState(currentPart.price);
  const [production, setProduction] = useState(currentPart.production);
  const [img, setImg] = useState(currentPart.img);
  const { t } = useTranslation();

  const changePartHandler = () => {
    dispatch(
      setPart(
        newId || id,
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
            <img className={styles.image} src={img} alt="part" />
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
              {t('changePhoto')}
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
            className={styles.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </div>
        <div className={styles.info}>
          <b>{t('model')}:</b> {currentPart.models}
        </div>
        <div className={styles.info}>
          <b>{t('condition')}: </b>
          <NativeSelect onChange={(e) => setCondition(e.target.value)}>
            <option value={'новая'}>{t('new')}</option>
            <option value={'б/у'}>{t('used')}</option>
          </NativeSelect>
        </div>
        <div className={styles.info}>
          <b>{t('price')}: </b>
          <Input
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className={styles.info}>
          <b>{t('production')}: </b>
          <Input
            value={production}
            onChange={(e) => setProduction(e.target.value)}
          />
        </div>
        <NavLink to="/profile/myParts">
          <Button
            id="saveButton"
            className={styles.button}
            variant="contained"
            color="primary"
            onClick={changePartHandler}
          >
            {t('save')}
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

PartOptions.propTypes = {
  newId: string,
  setPart: func,
};

export default PartOptions;
