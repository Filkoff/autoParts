import React from 'react';
import PartOptions from '../PartOptions/PartOptions';
import { changeDealerPart } from '../../../../actions/dealer';

const ChangeDealerPart = () => {
  return <PartOptions setPart={changeDealerPart} />;
};

export default ChangeDealerPart;
