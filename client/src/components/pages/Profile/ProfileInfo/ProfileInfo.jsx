import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import avatarLogo from '../../../../assets/img/avatar.jpg';
import { API_URL } from '../../../../config';
import CreateIcon from '@material-ui/icons/Create';
import styles from './ProfileInfo.module.scss';
import MapWindow from '../../../Map/MapWindow';
import Modal from '../../../Modal/ModalWindow';
import {
  changeDescription,
  changeName,
  deleteAvatar,
  uploadAvatar,
} from '../../../../actions/user';

function ProfileInfo() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const addr = useSelector((state) => state.user.address);
  const { t } = useTranslation();
  const avatar = currentUser.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.description);
  const [isChangeNameDisplayed, setIsChangeNameDisplayed] = useState(false);
  const [isChangeDescrDisplayed, setIsChangeDescrDisplayed] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  function inputHandler(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  }

  const nameInfo = (
    <div className={styles.name}>
      <b> {t('name')}:</b> {currentUser.name}
      <CreateIcon
        className={styles.createIcon}
        fontSize={'small'}
        color="disabled"
        onClick={() => setIsChangeNameDisplayed(true)}
      />
    </div>
  );

  const changingNameInfo = (
    <div>
      <TextField
        className={styles.nameInfo}
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Button
        id="changeNameButton"
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={() => {
          dispatch(changeName(currentUser.id, name));
          setIsChangeNameDisplayed(false);
        }}
      >
        {t('changeName')}
      </Button>
    </div>
  );

  const descriptionInfo = (
    <div className={styles.description}>
      <b>{t('additInfo')}: </b>
      <p>
        {currentUser.description}
        <CreateIcon
          className={styles.createIcon}
          fontSize="small"
          color="disabled"
          onClick={() => setIsChangeDescrDisplayed(true)}
        />
      </p>
    </div>
  );

  const changingDescriptionInfo = (
    <div>
      <TextField
        className={styles.descriptionInfo}
        variant="outlined"
        multiline
        rows={4}
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Button
        id="changeDescriptionButton"
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={() => {
          dispatch(changeDescription(currentUser.id, description));
          setIsChangeDescrDisplayed(false);
        }}
      >
        {t('changeInfo')}
      </Button>
    </div>
  );

  return (
    <div className={styles.infoContainer}>
      <h2 className={styles.heading}>{t('profile')}</h2>
      <div className={styles.personalInfo}>
        <div>
          <div className={styles.button}>
            <label className={styles.btnLoad} htmlFor="btnInput">
              <img className={styles.avatar} src={avatar} alt="avatar" />
              <input
                onInput={(e) => {
                  inputHandler(e);
                }}
                className={styles.btnLoadInput}
                name="upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                placeholder="Load picture"
              />
            </label>
          </div>
          <Button
            variant="outlined"
            color="secondary"
            disabled={avatar === avatarLogo ? true : false}
            onClick={() => dispatch(deleteAvatar())}
          >
            {t('deleteAvatar')}
          </Button>
          <div className={styles.menu}>
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
              onClick={() => setIsModalShown(true)}
            >
              {t('myLocation')}
            </Button>
          </div>
        </div>
        <div className={styles.userInfoContainer}>
          <div className={styles.userInfo}>
            {!isChangeNameDisplayed ? nameInfo : changingNameInfo}
          </div>
          <div className={styles.userInfo}>
            {!isChangeDescrDisplayed
              ? descriptionInfo
              : changingDescriptionInfo}
          </div>
          <div className={styles.userInfo}>
            <p>
              <b>{t('address')}:</b>
              {addr ? ` ${addr}` : ` ${t('specifyLocation')}`}
            </p>
          </div>
          <Modal show={isModalShown} setShow={setIsModalShown}>
            <h3 className={styles.heading}> {t('chooseLocation')}</h3>

            <MapWindow />
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
              onClick={() => {
                setIsModalShown(false);
              }}
            >
              {t('save')}
            </Button>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
