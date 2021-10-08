import { Box, Button, Link, Tab, Tabs, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeName,
  changeDescription,
  deleteAvatar,
  uploadAvatar,
} from '../../../actions/user';
import avatarLogo from '../../../assets/img/avatar.jpg';
import { API_URL } from '../../../config';
import CreateIcon from '@material-ui/icons/Create';
import styles from './Profile.module.scss';
import { customerOrders } from '../../../actions/customer';
import { useTranslation } from 'react-i18next';
import Modal from '../../Modal/Modal';
import MapWindow from '../../Map/MapWindow';
import DealerPartsList from '../dealerPartsHandler/DealerPartsList/DealerPartsList';
import PartsSet from '../../templates/PartsSet/PartsSet';
import DealerOrderList from '../../orderList/DealerOrderList/DealerOrderList';
import CustomerOrderList from '../../orderList/CustomerOrderList/CustomerOrderList';
import { dealerOrders, getAllDealerParts } from '../../../actions/dealer';

function Profile(props) {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: 'about',
    1: 'myParts',
    2: 'addPart',
    3: 'orders',
  };

  const indexToTabName = {
    about: 0,
    myParts: 1,
    addPart: 2,
    orders: 3,
  };
  const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const addr = useSelector((state) => state.user.address);
  const { t } = useTranslation();
  const avatar = currentUser.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.description);
  const [displayChangeName, setDisplayChangeName] = useState(false);
  const [displayChangeDescr, setDisplayChangeDescr] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event, newValue) => {
    history.push(`/profile/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  function inputHandler(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  }

  const nameInfo = (
    <div>
      <b> {t('name')}:</b> {currentUser.name}{' '}
      <CreateIcon
        style={{ cursor: 'pointer' }}
        fontSize={'small'}
        color="disabled"
        onClick={() => setDisplayChangeName(true)}
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
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={() => {
          dispatch(changeName(currentUser.id, name));
          setDisplayChangeName(false);
        }}
      >
        {t('changeName')}
      </Button>
    </div>
  );

  const descriptionInfo = (
    <div>
      <b>{t('additInfo')}: </b>
      <p>
        {' '}
        {currentUser.description}
        <CreateIcon
          style={{ cursor: 'pointer' }}
          fontSize="small"
          color="disabled"
          onClick={() => setDisplayChangeDescr(true)}
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
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={() => {
          dispatch(changeDescription(currentUser.id, description));
          setDisplayChangeDescr(false);
        }}
      >
        {t('changeInfo')}
      </Button>
    </div>
  );

  const mainInfo = (
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
            onClick={() => dispatch(deleteAvatar())}
          >
            {t('deleteAvatar')}
          </Button>
          <div className={styles.menu}>
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
              onClick={() => setShowModal(true)}
            >
              {t('myLocation')}
            </Button>
          </div>
        </div>
        <div className={styles.userInfoContainer}>
          <div className={styles.userInfo}>
            {!displayChangeName ? nameInfo : changingNameInfo}
          </div>
          <div className={styles.userInfo}>
            {!displayChangeDescr ? descriptionInfo : changingDescriptionInfo}
          </div>
          <div className={styles.userInfo}>
            <p>
              <b>{t('address')}:</b>{' '}
              {addr ? ` ${addr}` : `${t('specifyLocation')}`}
            </p>
          </div>
          <Modal show={showModal} setShow={setShowModal}>
            <h3 className={styles.heading}> {t('chooseLocation')}</h3>

            <MapWindow />
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
              onClick={() => {
                setShowModal(false);
              }}
            >
              {t('save')}
            </Button>
          </Modal>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: 400,
        }}
      >
        <Tabs
          value={selectedTab}
          className={styles.tabs}
          orientation="vertical"
          variant="scrollable"
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
          }}
        >
          <Tab selectedTab="0" label={t('mainInfo')} />
          {currentUser.type === 'dealer' ? (
            <Tab
              component={Link}
              label={t('myParts')}
              onClick={() => dispatch(getAllDealerParts())}
            />
          ) : null}
          {currentUser.type === 'dealer' ? (
            <Tab label={t('addPart')} component={Link} />
          ) : null}

          <Tab
            value={3}
            label={t('myOrders')}
            onClick={() => {
              currentUser.type === 'dealer'
                ? dispatch(dealerOrders(currentUser.id))
                : dispatch(customerOrders(currentUser.id));
            }}
          />
        </Tabs>
        {selectedTab === 0 && mainInfo}
        {selectedTab === 1 && currentUser.type === 'dealer' ? (
          <DealerPartsList />
        ) : null}
        {selectedTab === 2 && <PartsSet />}
        {selectedTab === 3 && currentUser.type === 'dealer' ? (
          <DealerOrderList />
        ) : null}
        {selectedTab === 3 && currentUser.type === 'customer' ? (
          <CustomerOrderList />
        ) : null}
      </Box>
    </div>
  );
}

export default Profile;
