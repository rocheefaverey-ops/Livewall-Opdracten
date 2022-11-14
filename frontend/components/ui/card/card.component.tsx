import React, { ReactNode } from 'react';
import classNames from 'classnames';
import classes from './card.module.css';

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const Card: React.FC<Props> = ({ children, className = '', onClick }) => (
  <div className={classNames(classes.card, className)} onClick={onClick}>
    {children}
  </div>
);

export default Card;
