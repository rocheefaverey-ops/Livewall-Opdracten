/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import nl from 'date-fns/locale/nl';
import { useAppState } from 'app-state';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import useWindowDimensions from '../../../../utils/hooks/use-window-dimensions.hook';
import ErrorText from '../components/error-text/error-text.component';

type Props = {
  date: Date;
  onChange: (date: Date) => void;
  name: string;
  minDate?: Date;
  error?: boolean;
  errorText?: string;
  className?: string;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date;
  endDate?: Date;
};

const DatePickerInput: React.FC<Props> = ({
  date,
  onChange,
  error = false,
  minDate,
  name,
  errorText,
  className = '',
  selectsStart,
  selectsEnd,
  startDate,
  endDate
}) => {
  const [dateLocalesRegistered, setDateLocalesRegistered] = useState(false);
  const { isMobile } = useWindowDimensions();
  const { appState } = useAppState();

  useEffect(() => {
    registerLocale('nl', nl);
    setDateLocalesRegistered(true);
  }, []);

  const styling = classNames(className, `${error ? 'border-statusRed hover:border-statusRed focus:border-statusRed' : ''}`);

  const dateInput = (
    <div
      className="relative w-full"
      onClick={() => {
        if (isMobile) {
          const datePicker = document.querySelector(`#${name}`);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (datePicker as any)?.showPicker();
        }
      }}
    >
      <div className={`w-full border-2 focus:outline-0 bg-white  ${styling} `}>
        {isMobile ? (
          <div className="py-1.5 px-2 w-full">
            <input
              min={minDate ? DateTime.fromJSDate(minDate).toFormat('y-LL-dd') : undefined}
              value={DateTime.fromJSDate(date).toFormat('y-LL-dd')}
              onChange={(e) => {
                onChange(new Date(e.target.value));
              }}
              className="w-full block bg-transparent outline-0 focus:outline-0 after:content-none before:content-none unstyled w-full text-left"
              type="date"
              id={name}
            />
          </div>
        ) : (
          <div className="bg-transparent rounded-full w-full h-full p-1">{date.toLocaleDateString('nl')}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className={className}>
      {isMobile
        ? dateInput
        : dateLocalesRegistered && (
            <DatePicker
              selectsStart={selectsStart}
              selectsEnd={selectsEnd}
              startDate={startDate}
              endDate={endDate}
              minDate={minDate}
              customInput={dateInput}
              locale={appState.language}
              onChange={(newDate: Date) => onChange(newDate)}
              selected={date}
            />
          )}

      {error && errorText && <ErrorText text={errorText} />}
    </div>
  );
};

export default DatePickerInput;
