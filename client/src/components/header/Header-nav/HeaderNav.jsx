import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CartIcon from '../CartIcon/CartIcon';
import CommentIcon from '@material-ui/icons/Comment';
import { clearCurrentPerson } from '../../../reducers/chatReducer';
import { avatarUrl } from '../../../utils/avatarUrlCreator';
import { logout } from '../../../reducers/userReducer';
import avatarLogo from '../../../assets/img/avatar.jpg';
import styles from './HeaderNav.module.scss';

const HeaderNav = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useHistory();
  const currentUser = useSelector((state) => state.user.currentUser);

  const avatar = currentUser.avatar
    ? avatarUrl(currentUser.avatar)
    : avatarLogo;

  return (
    <div id="headerIconsContainer">
      <div className={styles.headerIconsContainer}>
        {currentUser.type === 'customer' ? (
          <div className={styles.headerIcon}>
            <CartIcon />
          </div>
        ) : null}

        <div className={styles.iconContainer}>
          <NavLink to="/chat">
            <CommentIcon
              id="chatIcon"
              fontSize="large"
              className={styles.commentIcon}
              onClick={() => dispatch(clearCurrentPerson())}
            />
          </NavLink>
        </div>

        <div className={styles.iconContainer}>
          <NavLink to="/profile/about">
            <img
              id="userAvatar"
              className={styles.userAvatar}
              src={avatar}
              alt="avatar"
            />
          </NavLink>
        </div>

        <Button
          id="logOutButton"
          size="small"
          variant="outlined"
          className={styles.headerButton}
          onClick={() => {
            dispatch(logout());
            router.push('/main');
          }}
        >
          {t('login.logOut')}
        </Button>
      </div>
    </div>
  );
};

export default HeaderNav;
