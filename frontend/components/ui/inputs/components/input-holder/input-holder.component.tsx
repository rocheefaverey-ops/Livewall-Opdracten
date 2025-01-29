import Typography from '@components/ui/typography/typography.component';
import classNames from 'classnames';
import React, { JSX } from 'react';

type Props = {
  label?: string;
  required?: boolean;
  className?: string;
  extraText?: string;
  children: JSX.Element;
};

const InputHolder: React.FC<Props> = ({ label, required = false, className = '', children, extraText }) => {
  const styling = classNames(className);
  return (
    <div className={`my-2 w-full ${styling}`}>
      <div className="flex justify-between w-auto items-center">
        {label && <Typography type="span" className="mb-1.5">{`${label}${required ? '*' : ''}`}</Typography>}
        {extraText && (
          <Typography className="text-[14px]" type="p">
            {extraText}
          </Typography>
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default InputHolder;
