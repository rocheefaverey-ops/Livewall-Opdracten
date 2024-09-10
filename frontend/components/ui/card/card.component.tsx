import React, { ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const Card: React.FC<Props> = ({ children, className = '', onClick }) => (
  <div className={classNames('rounded bg-tertiary shadow-medium', className)} onClick={onClick}>
    {children}
  </div>
);

export default Card;
