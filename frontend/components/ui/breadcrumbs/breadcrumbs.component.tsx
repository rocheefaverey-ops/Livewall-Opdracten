import React, { Fragment } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import classes from './Breadcrumbs.module.css';

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

type BreadcrumbItem = {
  id: string;
  name: string;
  link: string;
};

const Breadcrumbs: React.FC<Props> = ({ items, className = '' }) => (
  <div className={classNames(classes.breadcrumbs, className)}>
    {items.map((breadcrumb, index) => {
      const { id, name, link } = breadcrumb;

      return (
        <Fragment key={id}>
          {index === items.length - 1 ? ( // last item
            <div className={classNames(classes.breadcrumbs__item, classes['breadcrumb__item--current'])}>{name}</div>
          ) : (
            <>
              <Link href={link}>
                <a className={classes.breadcrumbs__item}>{name}</a>
              </Link>
              <div className={classes.breadcrumbs__item}>{`>`}</div>
            </>
          )}
        </Fragment>
      );
    })}
  </div>
);

export default Breadcrumbs;
