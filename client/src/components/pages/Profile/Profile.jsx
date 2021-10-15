import React, { useState } from 'react';
import { Box, Link, Tab, Tabs } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profile.module.scss';
import { customerOrders } from '../../../actions/customer';
import { useTranslation } from 'react-i18next';
import DealerPartsList from '../dealerPartsHandler/DealerPartsList/DealerPartsList';
import PartsSet from '../../templates/PartsSet/PartsSet';
import DealerOrderList from '../../orderList/DealerOrderList/DealerOrderList';
import CustomerOrderList from '../../orderList/CustomerOrderList/CustomerOrderList';
import { dealerOrders, getAllDealerParts } from '../../../actions/dealer';
import { useHistory, useParams } from 'react-router';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile() {
  const history = useHistory();
  const { page } = useParams();

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
  const { t } = useTranslation();
  const handleChange = (event, newValue) => {
    history.push(`/profile/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

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
          <Tab label={t('mainInfo')} />
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
            id="ordersTab"
            value={3}
            label={t('myOrders')}
            onClick={() => {
              currentUser.type === 'dealer'
                ? dispatch(dealerOrders(currentUser.id))
                : dispatch(customerOrders(currentUser.id));
            }}
          />
        </Tabs>
        {selectedTab === 0 && <ProfileInfo />}
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
