import React, { ReactElement } from 'react';
import { FaStar } from 'react-icons/fa';

interface Props {
  value: number;
}

function RatingStar({ value }: Props): ReactElement {
  return (
    <span className="text-yellow-400 ml-2 flex items-center">
      <FaStar />
      <span className="ml-1">{value}</span>
    </span>
  );
}

export default RatingStar;
