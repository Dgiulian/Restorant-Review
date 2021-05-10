import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => (
    <input
      className={`w-full p-2 mb-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out`}
      {...props}
      ref={ref}
    />
  )
);

export default Input;
