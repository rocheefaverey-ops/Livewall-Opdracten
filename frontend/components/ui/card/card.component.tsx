/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import classes from './card.module.css';

type Props = {
  children: ReactNode;
  className?: string;
};

const Card: React.FC<Props> = ({ children, className = '' }) => <div className={`${classes.card} ${className}`}>{children}</div>;

export default Card;
