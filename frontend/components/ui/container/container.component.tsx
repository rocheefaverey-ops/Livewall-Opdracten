import React, { ReactNode } from 'react';
import classNames from 'classnames';
import classes from './container.module.css';

type Props = {
  children: ReactNode;
  className?: string;
};

const Container: React.FC<Props> = ({ children, className = '' }) => <div className={classNames(classes.container, className)}>{children}</div>;

export default Container;
