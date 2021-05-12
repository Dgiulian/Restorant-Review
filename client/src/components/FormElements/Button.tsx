/* eslint-disable import/no-anonymous-default-export */
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customClassName?: string;
}

/* 
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {} 
  */
export const PrimaryButton = (props: ButtonProps) => {
  return (
    <button
      className={`bg-green py-2 px-4 text-white rounded border border-green focus:outline-none focus:border-green-dark`}
      {...props}
    >
      {props.children}
    </button>
  );
};
export const SecondaryButton = (props: ButtonProps) => {
  return (
    <button
      className={`bg-blue-500 py-2 px-4 text-white rounded border border-blue-500 focus:outline-none focus:border-blue-dark ${props.customClassName}`}
      {...props}
    >
      {props.children}
    </button>
  );
};
export const DeleteButton = (props: ButtonProps) => {
  return (
    <button
      className={`py-2 px-4 text-red-600 focus:outline-none outline-none ${props.customClassName}`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default { PrimaryButton, SecondaryButton };
