import React, { ReactNode } from 'react';
import classNames from 'classnames';
import classes from './card.module.css';

type Props = {
  children: ReactNode;
  className?: string;
};

const Card: React.FC<Props> = ({ children, className = '' }) => <div className={classNames(classes.card, className)}>{children}</div>;

export default Card;
