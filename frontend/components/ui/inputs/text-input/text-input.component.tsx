import classNames from 'classnames';
import React, { HTMLInputTypeAttribute } from 'react';
import ErrorText from '../components/error-text/error-text.component';

type Props = {
  onChange: (value: string) => void;
  value: string;
  name: string;
  autoFocus?: boolean;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};

const TextInput: React.FC<Props> = ({ onChange, value, name, autoFocus, placeholder, error = false, errorText, className = '', type, inputProps }) => {
  const styling = classNames(className, `${error ? 'border-statusRed hover:border-statusRed focus:border-statusRed' : ''}`);
  return (
    <>
      <input
        className={`w-full  border-2 p-1 focus:outline-0 ${styling} `}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name={name}
        type={type}
        autoFocus={autoFocus}
        {...inputProps}
      />
      {error && errorText && <ErrorText text={errorText} />}
    </>
  );
};

export default TextInput;
