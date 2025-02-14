import classNames from 'classnames';
import React from 'react';
import ErrorText from '../components/error-text/error-text.component';

type Props = {
  onChange: (value: string) => void;
  options: { key: string; value: string | number }[];
  name: string;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  className?: string;
  value?: string;
  selectProps?: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
};

const Dropdown: React.FC<Props> = ({ onChange, name, error = false, errorText, className = '', options, placeholder, value, selectProps }) => {
  const renderOptions = () => {
    const optionElements = [];
    if (placeholder) {
      optionElements.push(
        <option value={placeholder} disabled key="default">
          {placeholder}
        </option>
      );
    }

    options.forEach((option) => {
      optionElements.push(
        <option key={option.key} value={option.value}>
          {option.key}
        </option>
      );
    });
    return optionElements;
  };

  const styling = classNames(className, `${error ? 'border-statusRed hover:border-statusRed focus:border-statusRed' : ''}`);
  return (
    <>
      <div className="relative">
        <select
          value={value}
          name={name}
          className={`w-full border-2 p1 focus:outline-0 ${styling}`}
          defaultValue={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          {...selectProps}
        >
          {renderOptions()}
        </select>
      </div>
      {error && errorText && <ErrorText text={errorText} />}
    </>
  );
};

export default Dropdown;
