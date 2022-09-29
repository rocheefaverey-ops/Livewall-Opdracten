import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const Container: React.FC<Props> = ({ children, className = '' }) => <div className={`max-w-[1200px] w-full mx-auto my-0 ${className}`}>{children}</div>;

export default Container;
