import React, { ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  className?: string;
};

const Card: React.FC<Props> = ({ children, className = '' }) => <div className={classNames('rounded-sm bg-tertiary shadow-medium', className)}>{children}</div>;

export default Card;
