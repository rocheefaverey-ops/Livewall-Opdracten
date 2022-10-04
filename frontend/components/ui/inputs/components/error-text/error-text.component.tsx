import Typography from '@components/ui/typography/typography.component';
import React from 'react';

type Props = {
  text: string;
};

const ErrorText: React.FC<Props> = ({ text }) => (
  <div className="flex my-1.5">
    <Typography type="span" className="text-[14px] text-statusRed">
      {text}
    </Typography>
  </div>
);

export default ErrorText;
