import React from 'react';
import styles from './HeaderNav.module.scss';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import avatarLogo from '../../../assets/img/avatar.jpg';
import { API_URL } from '../../../config';
import { logout } from '../../../reducers/userReducer';
import CartIcon from '../CartIcon/CartIcon';
import CommentIcon from '@material-ui/icons/Comment';
import { clearCurrentPerson } from '../../../reducers/chatReducer';

const HeaderNav = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const avatar = currentUser.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;

  return (
    <div id="headerIconsContainer">
      <div className={styles.headerIconsContainer}>
        {currentUser.type === 'customer' ? (
          <div className={styles.headerIcon}>
            <CartIcon />
          </div>
        ) : null}
        <NavLink to="/chat">
          <CommentIcon
            fontSize="large"
            className={styles.commentIcon}
            onClick={() => dispatch(clearCurrentPerson())}
          />
        </NavLink>
        <NavLink to="/profile/about">
          <img
            id="userAvatar"
            className={styles.userAvatar}
            src={avatar}
            alt="avatar"
          />
        </NavLink>
        <NavLink to="/main">
          <Button
            className={styles.headerButton}
            onClick={() => dispatch(logout())}
          >
            {t('login.logOut')}
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderNav;
