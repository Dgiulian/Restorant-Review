import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
/* interface InputProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {} */
const Input = (props: InputProps) => {
  return (
    <input
      className={`w-full p-2 mb-4 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out`}
      {...props}
    />
  );
};

export default Input;
