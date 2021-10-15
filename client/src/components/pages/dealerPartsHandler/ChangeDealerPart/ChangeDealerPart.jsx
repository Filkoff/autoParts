import React from 'react';
import { changeDealerPart } from '../../../../actions/dealer';
import PartOptions from '../PartOptions/PartOptions';

const ChangeDealerPart = () => {
  return <PartOptions setPart={changeDealerPart} />;
};

export default ChangeDealerPart;
