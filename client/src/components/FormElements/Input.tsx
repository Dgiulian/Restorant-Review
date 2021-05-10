import React, { InputHTMLAttributes, useRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
/* interface InputProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {} */
const Input = (props: InputProps) => {
  const ref = useRef();
  return (
    <input
      className={`w-full p-2 mb-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out`}
      {...props}
    />
  );
};

export default Input;
