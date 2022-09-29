import React, { ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  type?: keyof typeof typeMapping;
  color?: string;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
};

export const typeMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  span: 'span',
  ul: 'ul',
  ol: 'ol',
  p: 'p',
  small: 'p',
  label: 'p',
  'label-big': 'p',
  'intro-line': 'p',
  'extra-info': 'p',
  'call-to-action': 'p'
};

const Typography: React.FC<Props> = ({ children, type = 'p', color = '', className = '', ...props }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTag = (typeMapping[type] ?? 'p') as any;

  const styling = classNames(
    { small: type === 'small' },
    { label: type === 'label' },
    { 'call-to-action': type === 'call-to-action' },
    { [`!${color}`]: color },
    className
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CustomTag {...props} className={styling}>
      {children}
    </CustomTag>
  );
};

export default Typography;
