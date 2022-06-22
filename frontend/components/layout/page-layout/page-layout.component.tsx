import React from 'react';

type Props = {
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = ({ children }) => (
  <div className="page-layout">
    {children}
  </div>
);

export default PageLayout;
