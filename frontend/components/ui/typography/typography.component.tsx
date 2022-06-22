import React from 'react';

type Props = {
  type?: string;
  color?: string;
  variant?: string;
  className?: string;
};

const typeMapping = {
  h1: {type:"h1", defaultHeader:"header1"},
  h2: {type:"h2", defaultHeader:"header2"},
  h3: {type:"h3", defaultHeader:"header3"},
  h4: {type:"h4", defaultHeader:"header4"},
  h5: {type:"h5", defaultHeader:"header5"},
  h6: {type:"h6", defaultHeader:"header6"},
  label: {type:"label", defaultHeader:"label"}
};

const Typography: React.FC<Props> = ({children, type, variant = '', color = 'text-primary', className = ''}) => {
  const CustomTag = type ? typeMapping[type].type : "p";
  const CustomVariant = type && variant === '' ? typeMapping[type].defaultHeader : variant
  return <CustomTag className={`${className} ${CustomVariant} ${color}`}>{children}</CustomTag>
};

// const Typography: React.FC<Props> = ({ children, type, color = 'text-marine01', className }) => {
//   if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'span', 'p', 'blockquote', 'ul'].includes(type)) {
//     let styling = classNames(color, className);
//     let CustomTag = type;
//     if (type === 'h7') {
//       CustomTag = 'h6';
//       styling = classNames(color, className, 'h7');
//     }
//     return <CustomTag className={styling}>{children}</CustomTag>;
//   }
//   if (['label', 'label large'].includes(type)) {
//     const styling = classNames(type, color, className);
//     return <div className={styling}>{children}</div>;
//   }
//   const styling = classNames(type, color, className);
//   return <p className={styling}>{children}</p>;
// };

export default Typography;
