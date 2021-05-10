import React, { ReactElement } from 'react';
import { FieldError } from 'react-hook-form';

interface Props {
  value: FieldError | undefined;
}

function FormValidationError({ value }: Props): ReactElement | null {
  return value ? <p className="text-red-500">{value.message}</p> : null;
}

export default FormValidationError;
