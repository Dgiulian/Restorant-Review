import classNames from 'classnames';
import React, { ReactElement } from 'react';

interface Props {
  text: string;
  variant?: 'best' | 'worst';
}
const variants = {
  best: 'bg-green-600',
  worst: 'bg-red-600',
};
function Pill({ text, variant = 'best' }: Props): ReactElement {
  return (
    <span
      className={classNames(
        'mx-2 text-xs rounded-md p-1 text-white',
        variants[variant]
      )}
    >
      {text}
    </span>
  );
}

export default Pill;
