import React, { ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/* 
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {} 
  */
const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <button
      className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
