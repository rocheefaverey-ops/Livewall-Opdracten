import React from 'react';

type Props = {
  title: string;
};


const SectionExample: React.FC<Props> = ({title = 'Section example'}) => {
  console.log('SectionExamplee', title);
  return (
    <div className="block">{title}</div>
  );
}
  

export default SectionExample;
