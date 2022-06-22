import React from 'react';

type Props = {
  title: string;
};


const SectionAlertBar: React.FC<Props> = ({title = 'Section example'}) => (
  <div className="block">{title}</div>
);

export default SectionAlertBar;
