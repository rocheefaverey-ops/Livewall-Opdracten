import React, { ReactNode } from 'react';
import classes from './container.module.css';

type Props = {
  children: ReactNode;
  className?: string;
};

const Container: React.FC<Props> = ({ children, className = '' }) => <div className={`${classes.container} ${className}`}>{children}</div>;

export default Container;
