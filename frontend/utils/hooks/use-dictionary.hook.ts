/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { filterLocale } from '@utils/helpers/filter-locale';
import { Dictionary } from 'dictionaries/dictionary';
import { useParams } from 'next/navigation';

/* eslint-disable import/no-dynamic-require */
export const useDictionary = () => {
  const { locale } = useParams();
  const filteredLocale = filterLocale(locale as string);
  const dictionary = require(`../../dictionaries/${filteredLocale}.json`);
  return dictionary as Dictionary;
};
