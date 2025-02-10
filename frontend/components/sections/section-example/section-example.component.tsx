import React from 'react';

type Props = {
  title: string;
};


const SectionExampe: React.FC<Props> = ({title = 'Section example'}) => {
  console.log('SectionExampel', title);
  return (
    <div className="block">{title}</div>
  );
}
  

export default SectionExampe;
