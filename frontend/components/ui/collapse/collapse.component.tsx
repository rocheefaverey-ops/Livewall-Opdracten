import React, { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from '@assets/icon';
import classNames from 'classnames';
import Card from '../card/card.component';
import Typography from '../typography/typography.component';
import classes from './collapse.module.css';

type Props = {
  title: string;
  children: ReactNode;
};

const Collapse: React.FC<Props> = ({ title, children }) => {
  const [showDetails, setShowdetails] = useState(false);

  return (
    <Card onClick={() => setShowdetails(!showDetails)} className={classNames(classes.collapse, { 'p-2 ': !showDetails, ' md:mt-3 md:mb-0 ': showDetails })}>
      <div className={classes.collapse__title} onClick={() => setShowdetails(!showDetails)}>
        <Typography type="h3" color="header5" className="flex items-center justify-between">
          <div className="w-[calc(100%-48px)]">{title}</div>
          {showDetails ? <ChevronUp alt="Close" /> : <ChevronDown alt="Open" />}
        </Typography>
      </div>
      <div className={classNames(classes.collapse__detail, { 'max-h-fit': showDetails, 'max-h-[0px]': !showDetails })}>{children}</div>
    </Card>
  );
};

export default Collapse;
