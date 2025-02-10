import React, { ReactNode } from 'react';
import Button from '@components/ui/button/button.component';
import classNames from 'classnames';
import ErrorText from '../components/error-text/error-text.component';

type Props = {
  buttonText?: string;
  acceptedTypes?: string;
  children?: ReactNode;
  error?: boolean;
  errorText?: string;
  className?: string;
  handleFileUpload: (files: FileList) => void;
};

const FileInput: React.FC<Props> = ({ children, error = false, errorText, buttonText = 'Upload', acceptedTypes = '*', className = '', handleFileUpload }) => {
  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    handleFileUpload(event.target.files);
  };

  const styling = classNames(className, `${error ? 'border-statusRed hover:border-statusRed focus:border-statusRed' : ''}`);
  return (
    <>
      <label htmlFor="file-upload" className={styling}>
        {children || (
          <Button type="secondary" className="py-1 pointer-events-none" buttonElementType="submit">
            {buttonText}
          </Button>
        )}
      </label>
      <input type="file" id="file-upload" hidden onChange={onFileUpload} accept={acceptedTypes} />
      {error && errorText && <ErrorText text={errorText} />}
    </>
  );
};

export default FileInput;
