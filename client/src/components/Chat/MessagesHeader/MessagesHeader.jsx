import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { useSelector } from 'react-redux';
import { current } from '../../../selectors/selectors';
import { string } from 'prop-types';
import styles from './MessagesHeader.module.scss';

function MessagesHeader({ name }) {
  // const current = useSelector((state) => state.chat.currentPerson);
  const headerInfo = (
    <div className={styles.person}>
      <img
        className={styles.avatar}
        src="/assets/images/avatar.jpg"
        alt="avatar"
      />
      <h2>{name}</h2>
    </div>
  );

  return <div>{name ? headerInfo : null}</div>;
}
const mapStateToProps = createStructuredSelector({
  name: current,
});

MessagesHeader.propTypes = {
  name: string,
};

export default connect(mapStateToProps)(MessagesHeader);

// export default MessagesHeader;
